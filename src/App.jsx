import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);

  React.useEffect(()=>{
    fetch("http://localhost:3000/todos").then((response)=>{
      response.json().then((data) =>{
        setTodos(data);
      });
    })
  },[])
 
  return (
    <div>
  {todos.map(todo =>{
    return <GetAllTodos key = {todo.id}  todo = {todo}></GetAllTodos>
  })}
   </div>
  )
 

  // coponent to for todo
  function GetAllTodos({todo})
  {
    return(
      <div>
        {todo.title}
        <br/>
        {todo.description}
        <br />
        {todo.id}
        <br />
        <br />
        <br />
      </div>
    )
  }
}

export default App
