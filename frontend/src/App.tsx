import React, { createContext, useEffect, useState } from 'react';
import { fetchTasks } from './APICall';
import './App.css';
import Header from './Components/Header';
import { ITask, ITaskDB } from './Interfaces';
import Main from './Routing/Main';

export const TodoListContext = createContext<{todoList: ITask[], setTodoList: (list: ITask[]) => void}>({
  todoList: [], 
  setTodoList: (list: ITask[]) => {}
});


const App:React.FC = () => {
  //Liste des tâches
  const [todoList, setTodoList] = useState<ITask[]>([]);

  
  useEffect(() => {
      fetchTasks().then(res => res.json()).then(data => {
        setTodoList(data.map((taskDb: ITaskDB, key: number) => {
          return {
            id: taskDb.id,
            taskName: taskDb.name,
            completed: taskDb.completed,
            date: taskDb.date
          };
        }))
      })
  }, []);

  return (
    <div className="App">
        <TodoListContext.Provider value={{todoList:todoList, setTodoList:setTodoList}}>
          <Header></Header>
          <Main></Main>
        </TodoListContext.Provider>
    </div>
  );
}

export default App;
