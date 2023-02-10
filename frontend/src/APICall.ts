
// Fetch all tasks
export const fetchTasks = async () => {
    return fetch('http://localhost:3000/api/tasks');    
}

// Fetch task by ID
export const fetchTaskById = async (id: number) => {
    return fetch(`http://localhost:3000/api/task/${id}`);    
}

// Create task
export const createTask = async () => {
    return fetch('http://localhost:3000/api/tasks');    
}

// Update task
export const UpdateTask = async () => {
    return fetch('http://localhost:3000/api/tasks');    
}

// Delete task
export const deleteTask = async () => {
    return fetch('http://localhost:3000/api/tasks');    
}