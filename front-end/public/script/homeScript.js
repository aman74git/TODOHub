//load all todos on startup
(async () => {
  const todos = await getAllTodosDB();
  todos.forEach((todo) => {
    if (todo.completed) {
      insertNewCompletedTask(todo.description, false, todo._id);
    } else {
      insertNewPendingTask(todo.description, false, todo._id);
    }
  });
})();

addTaskBtn.addEventListener('click', async () => {
  const desc = String(addTaskBox.value).trim();
  if (desc.length >= 3) {
    const inserted = await insertNewPendingTask(desc, true);
    if (!inserted) {
      showInvalidCredential(
        'Unable to add task, you might be offline or logged out. Please check your internet connection or refresh the page'
      );
    }
    addTaskBox.value = '';
  } else {
    showInvalidCredential('Unable to add task, minimum 3 characters required');
  }
});

async function insertNewPendingTask(desc, isNew, id) {
  //select dummy task
  const pendingTaskEle = pendingTaskBox.querySelector('.task-ele');

  //clone dummy task
  const newTaskEle = pendingTaskEle.cloneNode(true);

  //set its content and make visible
  newTaskEle.querySelector('.task-content').innerText = `${desc}`;
  newTaskEle.querySelector('.task-check').checked = false;
  newTaskEle.classList.remove('d-none');

  //enable delete option, edit option, enable check option
  enableDeleteOption(newTaskEle);
  enableEditOption(newTaskEle);
  enableCheckOption(newTaskEle, insertNewCompletedTask);

  //add to database

  let insertedSuccessfully = true;
  if (isNew) {
    if (await addTodoDB(newTaskEle)) insertedSuccessfully = true;
    else insertedSuccessfully = false;
  } else {
    newTaskEle.setAttribute('data-id', id);
  }
  if (insertedSuccessfully) {
    //append to completed task
    pendingTaskBox.append(newTaskEle);
    handleNoPendingTask();
    handleNoCompleteTask();
    return true;
  }

  return false;
}

async function insertNewCompletedTask(desc, isNew, id) {
  //select dummy task
  const completedTaskEle = completedTaskBox.querySelector('.task-ele');

  //clone dummy task
  const newTaskEle = completedTaskEle.cloneNode(true);

  //set its content and make visible
  newTaskEle.querySelector('.task-content').innerText = `${desc}`;
  newTaskEle.querySelector('.task-check').checked = true;
  newTaskEle.classList.remove('d-none');

  //enable delete option, edit option, enable check option
  enableDeleteOption(newTaskEle);
  enableCheckOption(newTaskEle, insertNewPendingTask);

  let insertedSuccessfully = true;
  if (isNew) {
    if (!(await addTodoDB(newTaskEle))) insertedSuccessfully = false;
  } else {
    newTaskEle.setAttribute('data-id', id);
  }
  if (insertedSuccessfully) {
    //append to completed task
    completedTaskBox.append(newTaskEle);
    handleNoPendingTask();
    handleNoCompleteTask();
    return true;
  }
}

function enableCheckOption(node, insertNewTask) {
  node.querySelector('.task-check').addEventListener('click', async (e) => {
    const isDeleted = await deleteTask(e.target.parentElement.parentElement);
    if (!isDeleted) {
      node.querySelector('.task-check').checked =
        !node.querySelector('.task-check').checked;
      return;
    }
    insertNewTask(node.querySelector('.task-content').innerText, true);
  });
}

function enableDeleteOption(taskEle) {
  taskEle.querySelector('.delete-btns').addEventListener('click', async (e) => {
    await deleteTask(e.target.parentElement.parentElement);
  });
}

function enableEditOption(taskEle) {
  taskEle.querySelector('.edit-btns').addEventListener('click', (e) => {
    editTask(e.target.parentElement.parentElement);
  });
}

function editTask(node) {
  const taskContentBox = node.querySelector('.task-content');
  const newEditableInput = document.createElement('input');
  newEditableInput.value = taskContentBox.innerText;
  newEditableInput.setAttribute('class', 'task-content flex-grow-1 edit-box');

  taskContentBox.classList.add('d-none');
  node.querySelector('.edit-btns').classList.add('d-none');
  node.querySelector('.save-btns').classList.remove('d-none');

  taskContentBox.after(newEditableInput);
  newEditableInput.focus();
  newEditableInput.select();

  const saveBtn = node.querySelector('.save-btns');

  saveBtn.addEventListener(
    'click',
    async () => {
      const desc = String(newEditableInput.value).trim();

      if (desc.length < 3) {
        alert('minimum 3 characters');
      } else {
        const lastText = taskContentBox.innerText;
        taskContentBox.innerText = desc;

        const isUpdated = await updateTodoDB(node);
        if (!isUpdated) {
          taskContentBox.innerText = lastText;
        }
      }

      taskContentBox.classList.remove('d-none');
      newEditableInput.remove();
      node.querySelector('.edit-btns').classList.remove('d-none');
      node.querySelector('.save-btns').classList.add('d-none');
    },
    { once: true }
  );
}

async function deleteTask(node) {
  const isDeleted = await deleteTodoDB(node);
  if (!isDeleted) return false;
  node.remove();
  handleNoPendingTask();
  handleNoCompleteTask();
  return true;
}

function handleNoPendingTask() {
  if (pendingTaskBox.childElementCount >= 2) {
    if (!noPendingComponent.classList.contains('d-none'))
      noPendingComponent.classList.add('d-none');
    return;
  }
  if (noPendingComponent.classList.contains('d-none'))
    noPendingComponent.classList.remove('d-none');
}

function handleNoCompleteTask() {
  if (completedTaskBox.childElementCount >= 2) {
    if (!noCompleteComponent.classList.contains('d-none'))
      noCompleteComponent.classList.add('d-none');
    return;
  }
  if (noCompleteComponent.classList.contains('d-none'))
    noCompleteComponent.classList.remove('d-none');
}

function showInvalidCredential(msg) {
  const errEle = document.createElement('div');
  errEle.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">${msg}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
  navbarComp.insertAdjacentElement('afterend', errEle);
}
