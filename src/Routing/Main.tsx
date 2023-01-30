import { createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateTask from '../Components/CreateTask';
import Home from '../Components/Home';
import ShowTasks from '../Components/ShowTasks';
import { ITask } from '../Interfaces';

const Main = () => {
    const todoList: ITask[] = [];
    const TodoListContext = createContext<ITask[]>([]);
    return (         
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/create' element={<TodoListContext.Provider value={todoList}><CreateTask/></TodoListContext.Provider>} />
            <Route path='/list' element={<TodoListContext.Provider value={todoList}><ShowTasks/></TodoListContext.Provider>} />
        </Routes>
    );
}
export default Main;