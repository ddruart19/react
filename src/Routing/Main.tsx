import { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateTask from '../Components/CreateTask';
import EditTask from '../Components/EditTask';
import Home from '../Components/Home';
import ShowTasks from '../Components/ShowTasks';
import { ITask } from '../Interfaces';

// export const TodoListContext = createContext<{todoList : ITask[], setTodoList: (list: ITask[]) => void}>();

// type TodoContext = Context<{
//     todoList: ITask[];
//     setTodoList: (value: ITask[]) => void;
//   }>;

// export const todoListContext: TodoContext = createContext({
//     todoList: [],
//     // tslint:disable-next-line:no-empty
//     setValue: (value: ITask[]) => {}
//   });

export const TodoListContext = createContext<{todoList: ITask[], setTodoList: (list: ITask[]) => void}>({
    todoList: [], 
    setTodoList: (list: ITask[]) => {}
});

const Main = () => {
    const [todoList, setTodoList] = useState<ITask[]>([]);
    
    return (   
        <TodoListContext.Provider value={{todoList:todoList, setTodoList:setTodoList}}>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/create' element={<CreateTask/>} />
                <Route path='/list' element={<ShowTasks/>} />
                <Route path={'/edit/:id'} element={<EditTask/>}/>
            </Routes>
        </TodoListContext.Provider>
    );
}
export default Main;