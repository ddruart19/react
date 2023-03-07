import { OutputTaskCreation, OutputTaskUpdate, OutputUserCreation, OutputUserConnection } from "./Interfaces";


const END_POINT: string = "https://backend-xi-six.vercel.app/api";
const TASKS_ROUTE: string = "/tasks"
const USERS_ROUTE: string = "/users"

// Fetch all tasks
export const fetchTasks = async () => {
    const response = await fetch(END_POINT + TASKS_ROUTE);
    const data = await response.json();
    return data;    
}

// Fetch task by ID
export const fetchTaskById = async (id: string) => {
    return await (await fetch(END_POINT + TASKS_ROUTE + `?id=${id}`)).json();    
}

// Fetch task by name
export const fetchTaskByName = async (name: string) => {
    return await (await fetch(END_POINT + TASKS_ROUTE + `?name=${name}`)).json(); 
}

// Create task
export const createTask = (task: OutputTaskCreation) => {
    return fetch(END_POINT + TASKS_ROUTE , {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    });    
}

// Update task
export const UpdateTask = async (task : OutputTaskUpdate) => {
    return fetch(END_POINT + TASKS_ROUTE + `/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    });      
}

// Delete task
export const deleteTask = async (id: string) => {
    return fetch(END_POINT + TASKS_ROUTE + `/${id}`, {
        method: 'DELETE'
    });    
}


// Create User
export const createUser = (user: OutputUserCreation) => {
    return fetch(END_POINT + USERS_ROUTE, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    });    
}

// Authentication User
export const authUser = (user: OutputUserConnection) => {
    return fetch(END_POINT + USERS_ROUTE + '/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    });    
}