const express = require('express');
const product = require('./api/product');
const app = express();
const db = require('./dist/queries');
const PORT = 3000;

app.use("/api/product", product)

//Fetch all tasks
app.get('/api/tasks', db.getTasks);
//Fetch task by id
app.get('/api/task/:id', db.getTaskById);
//Create task
app.post('/api/task', db.createTask);
//Update task
app.put('/api/task/:id', db.updateTask);
//Delete task
app.delete('/api/task/:id', db.deleteTask);
//Validate task
app.put('/api/task/validate/:id', db.validateTask);

app.listen(PORT, () => console.log(`Running on ${PORT}`));