const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// temporary storage
let tasks = [];
let id = 1;

// CREATE task
app.post("/tasks", (req, res) => {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = {
    id: id++,
    title,
    description: description || "",
    status: status || "TODO"
  };

  tasks.push(task);
  res.status(201).json(task);
});

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// GET task by id
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

// UPDATE task
// UPDATE task
app.patch("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  Object.assign(task, req.body);

  res.json(task);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);

  res.json({ message: "Task deleted" });
});

// START SERVER
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});