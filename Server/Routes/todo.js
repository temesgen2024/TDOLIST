const express = require('express');
const router = express.Router();
const { getAllTodos, createTodo ,update,deleteTodo} = require('../Controller/controller');

router.get('/todos', getAllTodos);
router.post('/create', createTodo);
router.put('/update/:id',update);
router.delete('/delete/:id',deleteTodo);
module.exports = router;