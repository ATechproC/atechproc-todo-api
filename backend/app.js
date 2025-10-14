const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const Todo = require("./models/new_todo");

const app = express();
const PORT = process.env.PORT || 8080;

// add a new list :

app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(201).json({message : "all todos", todos})
    }catch(err) {
        console.log("error happened while trying to get all todos : ", err);
    }
})

app.post("/add", async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.status(201).json({message : " new todo added successfully!", todo : newTodo});
    }catch(err) {
        console.log("error happened while trying to add a new todo : ", err);
    }
})

app.get("/todo/:todoId", async (req, res) => {

    const { todoId } = req.params;

    try {
        const todo = await Todo.findById(todoId);
        res.status(201).json({message : "todo", todo});
    }catch(err) {
        console.log("error happened while trying to get a todo ", err);
    }
})

app.put("/update/:todoId", async (req, res) => {
    
    const { todoId } = req.params;
    
    try {
        const updateTodos = await Todo.findById(todoId, req.body);
        res.status(201).json({message : "todo updated with success!", todo : updateTodos});
    }catch(err) {
        console.log("error happened while trying to update a todo :", err);
    }
})

app.delete("/todo/:todoId", async (req, res) => {

    const { todoId } = req.params;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        res.status(201).json({message : "todo deleted", todo : deletedTodo});
    }catch(err) {
        console.log("error happened while trying to delete a todo : ", err)
    }
})

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`the server is running on the port ${PORT}`);
    })
}).catch((err) => {
    console.log("error happened while trying to connect to the DB.", err);
})
