import { OutputTaskCreation, OutputTaskUpdate } from "./Interfaces";

// Fetch all tasks
export const fetchTasks = async () => {
    const response = await fetch('https://todoapp-ddruart19.vercel.app/api/tasks');
    const data = await response.json();
    return data;    
}

// Fetch task by ID
export const fetchTaskById = async (id: string) => {
    return await (await fetch(`https://todoapp-ddruart19.vercel.app/api/task/${id}`)).json();    
}

// Create task
export const createTask = (task: OutputTaskCreation) => {
    return fetch('https://todoapp-ddruart19.vercel.app/api/task', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    });    
}

// Update task
export const UpdateTask = async (task : OutputTaskUpdate) => {
    return fetch(`https://todoapp-ddruart19.vercel.app/api/task/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    });      
}

// Delete task
export const deleteTask = async (id: string) => {
    return fetch(`https://todoapp-ddruart19.vercel.app/api/task/${id}`, {
        method: 'DELETE'
    });    
}