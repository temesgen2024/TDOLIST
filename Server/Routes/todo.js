const express = require('express');
const router = express.Router();
const { getAllTodos, createTodo ,update} = require('../Controller/controller');

router.get('/todo', getAllTodos);
router.post('/create', createTodo);
router.put('/update/:id',update);
module.exports = router;