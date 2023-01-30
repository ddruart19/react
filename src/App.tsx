import React, { useState } from 'react';
import './App.css';

const App:React.FC = () => {

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadLine] = useState<number>(0);

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input type="text" name="task" value={task} placeholder="Add a task" />
          <input type="number" name="deadline" value={deadline} placeholder="Set a deadline (in days)" />
        </div>
        <button>Add</button>
      </div>
      <div className="todoList"></div>
    </div>
  );
}

export default App;
