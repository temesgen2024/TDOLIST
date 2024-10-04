import React, { useEffect, useState } from "react";
import { fetchTodos, deleteTodo } from "../../Service/Service"; 
import { Link } from "react-router-dom";
import classes from "./all.module.css";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoAdd } from "react-icons/io5";

function AllTodos() {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

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

  const openModal = (descriptionId) => {
    console.log("Opening modal for ID:", descriptionId); // Log the ID
    setShowModal(true);
    setTodoToDelete(descriptionId);
  };

  const handleDeleteTodo = async () => {
    if (todoToDelete === null) return; // Check if there's a todo to delete
    try {
      await deleteTodo(todoToDelete);
      setTodos(todos.filter(todo => todo.description_id !== todoToDelete)); // Remove the deleted todo from state
      setShowModal(false);
      setTodoToDelete(null);
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTodoToDelete(null);
  };

  console.log("Todos:", todos); // Log the todos array

  return (
    <div className={classes.allContainer}>
      <div className={classes.title}>
        <h1>Website Todo List</h1>
      </div>
      <div>
        <div className={classes.Container}>
          <h2>Todo List</h2>
          <div>
            {todos.map((todo) => (
              <div key={todo.id} className={classes.todo}>
                <div className={classes.first}>
                  <input
                    className={classes.check}
                    checked={todo.completed === 1} // Assuming 1 is completed
                    type="checkbox"
                    readOnly 
                  />
                  <div className={classes.todotitle}>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                  </div>
                </div>
                <div className={classes.edit}>
                    <div>
                    <Link to={`/edit/${todo.id}`}><MdEdit size={30}/>
                    </Link>
                    </div>
                <div
                  onClick={() => openModal(todo.description_id)} // Use description_id here
                  className={classes.delete}
                >
                  <MdDelete size={30} fill="red" />
                </div>
                </div>
                
              </div>
            ))}
          </div>
          <div className={classes.add}>
            <Link to="/addtodo">
              <IoAdd size={30} />
            </Link>
          </div>
        </div>
      </div>
      {showModal && (
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            <h1>Are you sure you want to delete this todo?</h1>
            <div>
              <button className={classes.confirm} onClick={handleDeleteTodo}>Yes</button>
              <button className={classes.cancel} onClick={closeModal}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllTodos;
