const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const newTodo = new Schema({
    title : String,
    description : String,
    isCompleted : Boolean
}, {
    timestamps : true
})

const Todo = model("todo", newTodo);

module.exports = Todo;