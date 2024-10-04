import React, { useEffect, useState } from 'react';
import { fetchTodos, updateTodo as updateTodoService } from "../../Service/Service"; 
import { useParams } from 'react-router-dom'; 
import classes from "./detail.module.css";
import { useNavigate } from 'react-router-dom';

function Detail() {
  const [todos, setTodos] = useState([]);
  const [updatableTodo, setUpdatableTodo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getTodos = async () => {
      try {
        const fetchedTodos = await fetchTodos();
        setTodos(fetchedTodos);
        
        const todoToUpdate = fetchedTodos.find(todo => todo.id === Number(id));
        setUpdatableTodo(todoToUpdate);
        
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    getTodos();
  }, [id]);

  const handleUpdateTodo = async () => {
    if (!updatableTodo) return;

    const updatedCompletedStatus = !updatableTodo.completed; // Toggle the completed status

    try {
      // Pass the completed value as 1 (true) or 0 (false)
      await updateTodoService(id, { completed: updatedCompletedStatus ? 1 : 0 }); 
      setUpdatableTodo(prev => ({ ...prev, completed: updatedCompletedStatus })); // Update local state
      navigate('/'); // Navigate back after update
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className={classes.allContainer}>
      <div className={classes.title}>
        <h1>Update Todo List</h1>
      </div>
      <div>
        <div className={classes.container}>
          {updatableTodo ? (
            <div>
              <h2>{updatableTodo.title}</h2>
              <p>{updatableTodo.description}</p>
              <button className={classes.butonContanir} onClick={handleUpdateTodo}>
                {updatableTodo.completed ? "Mark as incomplete" : "Mark as complete"}
              </button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
