import { OutputTaskCreation, OutputTaskUpdate } from "./Interfaces";

// Fetch all tasks
export const fetchTasks = async () => {
    const response = await fetch('http://localhost:3000/api/tasks');
    const data = await response.json();
    return data;    
}

// Fetch task by ID
export const fetchTaskById = async (id: string) => {
    return await (await fetch(`http://localhost:3000/api/task/${id}`)).json();    
}

// Create task
export const createTask = (task: OutputTaskCreation) => {
    return fetch('http://localhost:3000/api/task', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    });    
}

// Update task
export const UpdateTask = async (task : OutputTaskUpdate) => {
    return fetch(`http://localhost:3000/api/task/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    });      
}

// Delete task
export const deleteTask = async (id: string) => {
    return fetch(`http://localhost:3000/api/task/${id}`, {
        method: 'DELETE'
    });    
}