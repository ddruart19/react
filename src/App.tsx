import React, { createContext, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import { ITask } from './Interfaces';
import Main from './Routing/Main';
import data from './data.json';

export const TodoListContext = createContext<{todoList: ITask[], setTodoList: (list: ITask[]) => void}>({
  todoList: [], 
  setTodoList: (list: ITask[]) => {}
});

const App:React.FC = () => {
  const [todoList, setTodoList] = useState<ITask[]>(data);
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
