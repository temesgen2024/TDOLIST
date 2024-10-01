// src/components/AllTodos.jsx
import React, { useEffect, useState } from 'react';
import { fetchTodos, updateTodo, deleteTodo } from '../../Service/Service'; // Ensure you import deleteTodo
import classes from './all.module.css';

function AllTodos() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const getTodos = async () => {
            try {
                const fetchedTodos = await fetchTodos();
                setTodos(fetchedTodos);
            } catch (error) {
                console.error(error);
            }
        };
        getTodos();
    }, []);

    const handleToggleTodo = async (id, completed) => {
        try {
            const updatedTodo = await updateTodo(id, { completed: !completed });
            setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
        } catch (error) {
            console.error("Failed to update todo", error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error("Failed to delete todo", error);
        }
    };

    return (
        <div className={classes.allContainer}>
            <input className={classes.input} type="text" placeholder="Add a new todo" />
            <div>
                {todos.map((todo) => (
                    <div key={todo.id} className={classes.todo}>
                        <input
                            className={classes.check}
                            onChange={() => handleToggleTodo(todo.id, todo.completed)}
                            checked={todo.completed}
                            type="checkbox"
                        />
                        <div className={classes.title}>
                            <h3>{todo.title}</h3>
                            <p>{todo.description}</p>
                        </div>
                        <div className={classes.delete}>
                            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllTodos;
