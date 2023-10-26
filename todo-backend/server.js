const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const {getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} = require('./controlers/todocontroller')

// App config
const app = express();
const port = process.env.PORT || 8000;
const connectionURL = process.env.MONGO_URI;

// Middlewares
// Convert to JSON
app.use(express.json());
app.use(Cors());

// DB config
mongoose
  .connect(connectionURL, {
    
  })
  .then(() => {
    app.listen(port, () => console.log(`Running On Port: ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });

// API Endpoints



// get todo list 

app.get('/todos', getTodos)


// create a new todo
app.post('/todos', createTodo)


// update a todo
app.put('/todos/:id', updateTodo)


// delete todo
app.delete('/todos/:id', deleteTodo)
