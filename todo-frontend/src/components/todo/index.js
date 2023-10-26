import React, { useState } from 'react'
import axios from "../../axios";
import { Container } from './styles';
import Form from '../form';
import TodoList from "../todolist";
import Author from "../author";

import {useEffect} from 'react';

function Todo() {

  const [input,setInput]=useState('');
  const [todos, setTodos] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axios.get("/todos");
      setTodos(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(todos,"todos");

  const addTodo = async (e) => {
    e.preventDefault();
    if (input.length === 0) return null;
    await axios.post("/todos", [
      {
        ...todos,
        text: input,
        completed: false,
      },
    ]);
    fetchData();
    setInput("");
   
  };











  return (
    <Container><h2>List Of ToDos</h2>

    {/* Form component */}
    <Form input={input} setInput={setInput} addTodo={addTodo} />
    {/* Todolist */}
    <TodoList todos={todos} fetchData={fetchData} />
  
    {/* Author component */}
    <Author />



    </Container>
    
  )
}

export default Todo