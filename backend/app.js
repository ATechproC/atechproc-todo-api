const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors'); 

require("dotenv").config();

const Todo = require("./models/new_todo");

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ ENABLE CORS FOR EVERYONE (Perfect for learning)
app.use(cors({
    origin: '*',  // Allows ANY website to access your API
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// add a new list :

app.use(express.json());

app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({ message: "all todos", todos })
    } catch (err) {
        console.log("error happened while trying to get all todos : ", err);
        res.status(500).json({ message: "Server error" });
    }
})

app.post("/add", async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.status(201).json({ message: " new todo added successfully!", todo: newTodo });
    } catch (err) {
        console.log("error happened while trying to add a new todo : ", err);
        res.status(500).json({ message: "Server error" });
    }
})

app.get("/todo/:todoId", async (req, res) => {

    const { todoId } = req.params;

    try {
        const todo = await Todo.findById(todoId);
        res.status(201).json({ message: "todo", todo });
    } catch (err) {
        console.log("error happened while trying to get a todo ", err);
        res.status(500).json({ message: "Server error" });
    }
})

app.put("/update/:todoId", async (req, res) => {

    const { todoId } = req.params;

    try {

        const updatedTodo = await Todo.findByIdAndUpdate(todoId, req.body, { new: true });

        if (!updatedTodo) {

            return res.status(404).json({ message: "Todo not found" });

        }

        res.status(201).json({ message: "todo updated with success!", todo: updatedTodo });

    } catch (err) {

        console.log("error happened while trying to update a todo :", err);
        res.status(500).json({ message: "Server error" });

    }

})

app.delete("/todo/:todoId", async (req, res) => {

    const { todoId } = req.params;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(201).json({ message: "todo deleted", todo: deletedTodo });

    } catch (err) {

        console.log("error happened while trying to delete a todo : ", err);
        res.status(500).json({ message: "Server error" });
        
    }
})

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`the server is running on the port ${PORT}`);
    })
}).catch((err) => {
    console.log("error happened while trying to connect to the DB.", err);
})
