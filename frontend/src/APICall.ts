import { OutputTask } from "./Interfaces";

// Fetch all tasks
export const fetchTasks = async () => {
    return await fetch('http://localhost:3000/api/tasks');    
}

// Fetch task by ID
export const fetchTaskById = async (id: string) => {
    return await fetch(`http://localhost:3000/api/task/${id}`);    
}

// Create task
export const createTask = async (task: OutputTask) => {
    return await fetch('http://localhost:3000/api/task', {
        method: 'POST',
        body: JSON.stringify({
          name: task.name,
          completed : task.completed,
          date: task.date
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    });    
}

// Update task
export const UpdateTask = async () => {
    return fetch('http://localhost:3000/api/tasks');    
}

// Delete task
export const deleteTask = async (id: string) => {
    return fetch(`http://localhost:3000/api/task/${id}`, {
        method: 'DELETE'
    });    
}