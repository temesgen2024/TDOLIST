// src/components/AllTodos.jsx
import React, { useEffect, useState } from 'react';
import { fetchTodos, updateTodo, deleteTodo } from '../../Service/Service'; // Ensure you import deleteTodo
import { Link } from 'react-router-dom';
import classes from './all.module.css';
import { MdDelete } from 'react-icons/md';
import { IoAdd } from 'react-icons/io5';
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
        
        <div className={classes.title}>
<h1>website todo list</h1>
        </div >
        <div>
        <div className={classes.Container}>
            <h2>Todo List</h2>
            <div>
                {todos.map((todo) => (
                    <div key={todo.id} className={classes.todo}>
                       <div className={classes.frist}>
                       <input
                            className={classes.check}
                            onChange={() => handleToggleTodo(todo.id, todo.completed)}
                            checked={todo.completed}
                            type="checkbox"
                        />
                        <div className={classes.todotitle}>
                            <h3>{todo.title}</h3>
                            <p>{todo.description}</p>
                        </div>
                       </div>
                        <div onClick={() => handleDeleteTodo(todo.id)} className={classes.delete}>
                         <MdDelete size={30} fill='red'/>
                        </div>
                    </div>
                ))}
            </div>
            <div className={classes.add}>
                <Link to="/addtodo">
                <IoAdd size={30}/>
                </Link>
            </div>
        </div> 
        </div>
     </div>   
    );
}

export default AllTodos;
