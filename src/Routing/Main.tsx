import { createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateTask from '../Components/CreateTask';
import Home from '../Components/Home';
import ShowTasks from '../Components/ShowTasks';
import { ITask } from '../Interfaces';

export const TodoListContext = createContext<ITask[]>([]);
const Main = () => {
    const todoList: ITask[] = [];
    return (   
        <TodoListContext.Provider value={todoList}>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/create' element={<CreateTask/>} />
                <Route path='/list' element={<ShowTasks/>} />
            </Routes>
        </TodoListContext.Provider>
    );
}
export default Main;