const todoService = require('../service/todoService');

const getAllTodos = async (req, res) => {
    try {
        const todos = await todoService.getAllTodos();
        res.status(200).json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ message: error.message });
    }
};

const createTodo = async (req, res) => {
    const { title, description } = req.body;

    // Input validation
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required.' });
    }

    try {
        const todo = await todoService.createTodo(title, description);
        res.status(201).json(todo);
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllTodos, createTodo };
