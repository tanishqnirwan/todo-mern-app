const mongoose = require("mongoose");
const Todos = require('../dbtodo');

// get Todo list
const getTodos = async (req, res) => {
    try {
        const allTodos = await Todos.find({}).sort({ createdAt: -1 });
        res.status(200).send(allTodos);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// create todo
const createTodo = async (req, res) => {
    const dbTodo = req.body;
    try {
        const newTodo = await Todos.create(dbTodo);
        res.status(201).send(newTodo);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// update
const updateTodo = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`There is no todo with id: ${id}`);
        }
        const todoID = { _id: id };
        const update = { completed: true };
        const updateTodo = await Todos.findOneAndUpdate(todoID, update);
        if (!updateTodo) {
            return res.status(404).send(`There is no todo with id: ${id}`);
        }
        res.status(200).send(updateTodo);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// delete todo
const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`There is no todo with id: ${id}`);
        }
        const deleteTodo = await Todos.findOneAndDelete({ _id: id });
        res.status(200).send(deleteTodo);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};
