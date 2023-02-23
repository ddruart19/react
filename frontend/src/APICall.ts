import { OutputTaskCreation, OutputTaskUpdate } from "./Interfaces";


const END_POINT: string = "https://backend-xi-six.vercel.app";

// Fetch all tasks
export const fetchTasks = async () => {
    const response = await fetch(END_POINT + '/api/tasks');
    const data = await response.json();
    return data;    
}

// Fetch task by ID
export const fetchTaskById = async (id: string) => {
    return await (await fetch(END_POINT + `/api/task/${id}`)).json();    
}

// Create task
export const createTask = (task: OutputTaskCreation) => {
    return fetch(END_POINT + '/api/task', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    });    
}

// Update task
export const UpdateTask = async (task : OutputTaskUpdate) => {
    return fetch(END_POINT + `/api/task/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    });      
}

// Delete task
export const deleteTask = async (id: string) => {
    return fetch(END_POINT + `/api/task/${id}`, {
        method: 'DELETE'
    });    
}

// Search tasks by name
export const searchTaskByName = async (search: string) => {
    const searchValue = {
        search
    }
    return fetch(END_POINT + '/api/task/search', {
        method: 'POST',
        body: JSON.stringify(searchValue),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    });   
}