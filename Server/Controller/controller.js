const todoService = require('../service/todoService');
const getAllTodos = async (req, res) => {
    try {
        const todo = await todoService.getAllTodos();
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const createTodo = async (req, res) => {
    const { title, description } = req.body;
    try {
        const todo = await todoService.createTodo(title, description);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports={getAllTodos,createTodo}