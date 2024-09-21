const express = require('express');
const router = express.Router();
const { getAllTodos, createTodo } = require('../Controller/controller');
router.get('/todo', getAllTodos);
router.post('/create', createTodo);
module.exports = router;