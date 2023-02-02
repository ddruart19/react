import React, { createContext, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import { ITask } from './Interfaces';
import Main from './Routing/Main';
import data from './data.json';
import { Button } from 'flowbite-react';

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
          <Button onClick={() => console.log(todoList)}>Show List From AppContext</Button>
        </TodoListContext.Provider>
    </div>
  );
}

export default App;
