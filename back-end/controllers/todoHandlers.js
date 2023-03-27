const Todo = require('../models/todo');

const createTodo = async (req, res) => {
  try {
    const { description, completed } = req.body;
    if (!description)
      return res.status(400).json({ msg: 'provide descreption' });

    const todo = new Todo({ description, completed });
    await todo.save();

    const user = req.user;
    user.todos.push(todo._id);
    await user.save();
    return res.status(201).json({ id: `${todo._id}` });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const updateTodo = async (req, res) => {
  try {
    //todo_id is passed as the parameter
    const todo_id = req.query.id;
    if (!todo_id)
      return res.status(400).json({ msg: 'provide id to be updated' });

    //updated info is passed in the body
    const updatedInfo = req.body;
    if (!updatedInfo) return res.status(400).json({ msg: 'nothing to update' });

    //find and update the todo body
    const todo = await Todo.findById(todo_id);
    if (!todo) return res.status(404).json({ msg: "can't find todo" });
    for (let keys in updatedInfo) {
      todo[keys] = updatedInfo[keys];
    }
    await todo.save();

    return res.status(200).send(todo);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const getAllTodos = async (req, res) => {
  try {
    const user = req.user;

    //all todos that belong to that user
    const todos = await Promise.all(
      user.todos.map(async (todo_id) => {
        const todo = await Todo.findById(todo_id);
        return todo;
      })
    );

    return res.status(200).json({ todos });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const user = req.user;
    const todo_id = req.query.id; // id of todo to be deleted is passed as the query
    if (!todo_id)
      return res.status(400).json({ msg: 'provide id to be deleted' });

    const todo = await Todo.findById(todo_id);
    if (!todo) return res.status(404).json({ msg: "can't find todo" });
    await todo.delete();

    //fetch id of all todos of an user
    const allTodos = user.todos;

    //filter todo, todo that contains deleted one's id is removed
    const newTodos = allTodos.filter((id) => {
      if (id != todo_id) return id;
    });
    user.todos = newTodos;
    await user.save();

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = { createTodo, updateTodo, deleteTodo, getAllTodos };
