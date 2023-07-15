const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();


const url = "mongodb+srv://amos333:maravattickal@cluster0.nva9f1k.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const todoSchema = new mongoose.Schema({
    description: String,
    completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
    try {
      const todos = await Todo.find({});
      res.json(todos);
    } catch (err) {
      console.error('Error fetching todos:', err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  app.post('/todos', async (req, res) => {
    try {
      const { description, completed } = req.body;
      const newTodo = new Todo({ description, completed });
      const savedTodo = await newTodo.save();
      res.json(savedTodo);
    } catch (err) {
      console.error('Error saving todo:', err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  app.put('/todos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { completed } = req.body;
      const updatedTodo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
      res.json(updatedTodo);
    } catch (err) {
      console.error('Error updating todo:', err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  app.delete('/todos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Todo.findByIdAndRemove(id);
      res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
      console.error('Error deleting todo:', err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  

app.listen(3000, () => {
    console.log("server Started");
});