import { useState } from 'react'
import { Route ,Routes} from 'react-router-dom'
import './App.css'
import AllTodos from './Component/AllTodos/AllTodos'
import CreateTodo from './Component/createTodo/CreateTodo'
import Detail from "./Component/Detail/Detail"
function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<AllTodos />} />
        <Route path="/addtodo" element={<CreateTodo />} />
        <Route path="/edit/:id" element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
