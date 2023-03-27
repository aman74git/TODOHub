async function addTodoDB(taskNode) {
  const description = taskNode.querySelector('.task-content').innerText;
  const completed = taskNode.querySelector('.task-check').checked;
  try {
    const response = await fetch('http://localhost:3000/todo/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ description, completed }),
    });
    if (response.ok) {
      const data = await response.json();
      taskNode.setAttribute('data-id', data.id);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

async function updateTodoDB(taskNode) {
  const description = taskNode.querySelector('.task-content').innerText;
  const id = taskNode.getAttribute('data-id');
  const completed = taskNode.querySelector('.task-check').checked;
  try {
    const response = await fetch(`http://localhost:3000/todo/update?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ description, completed }),
    });
    if (response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

async function deleteTodoDB(taskNode) {
  const id = taskNode.getAttribute('data-id');
  try {
    const response = await fetch(`http://localhost:3000/todo/remove?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

async function getAllTodosDB() {
  try {
    const response = await fetch('http://localhost:3000/todo/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      return data.todos;
    }
    return [];
  } catch (error) {
    return [];
  }
}
