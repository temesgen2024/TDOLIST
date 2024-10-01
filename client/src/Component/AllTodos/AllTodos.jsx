import React, { useEffect, useState } from 'react'
import { fetchTodos } from '../../Service/Service'
import classes from './all.module.css'
function AllTodos() {
    const [todos, setTodos] = useState([])
useEffect(()=>{
    const getTodos = async ( ) =>{
        try {
            const fetchedTodos = await fetchTodos()
            setTodos(fetchedTodos)
        } catch (error) {
         console.error(error)   
        }
    }
    getTodos();
}, [])

  return (
    <div className={classes.allContainer}>
      <input className={classes.input} type="text" />
      <div>
        {todos.map((todo) => (
          <div key={todo.id} className={classes.todo}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllTodos
