import { OutputTaskCreation, OutputTaskUpdate, OutputUserCreation, OutputUserConnection } from "./Interfaces";


const END_POINT: string = "https://backend-xi-six.vercel.app/api";
// const END_POINT: string = "http://localhost:3001/api";
const TASKS_ROUTE: string = "/tasks"
const USERS_ROUTE: string = "/users"

// Fetch all tasks
export const fetchTasks = async () => {
    const response = await fetch(END_POINT + TASKS_ROUTE,{credentials: 'include'});
    const data = await response.json();
    return data;    
}

// Fetch task by ID
export const fetchTaskById = async (id: string) => {
    return await (await fetch(END_POINT + TASKS_ROUTE + `?id=${id}`, {credentials: 'include'})).json();    
}

// Fetch task by name
export const fetchTaskByName = async (name: string) => {
    return await (await fetch(END_POINT + TASKS_ROUTE + `?name=${name}`, {credentials: 'include'})).json(); 
}

// Create task
export const createTask = (task: OutputTaskCreation) => {
    return fetch(END_POINT + TASKS_ROUTE , {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(task),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    });    
}

// Update task
export const updateTask = async (task : OutputTaskUpdate) => {
    return fetch(END_POINT + TASKS_ROUTE + `/${task.id}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(task),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    });      
}

// Delete task
export const deleteTask = async (id: string) => {
    return fetch(END_POINT + TASKS_ROUTE + `/${id}`, {
        method: 'DELETE',
        credentials: 'include',
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
        credentials: 'include',
        mode:"cors",
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    });    
}

// Verification if user is logged in
export const isLoggedIn = () => {
    fetch(END_POINT + USERS_ROUTE + '/isLoggedIn', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    }).then(res =>{
        if(res.status === 200)return true
        return false
    })
}