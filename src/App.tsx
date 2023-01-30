import React, { ChangeEvent, useState } from 'react';
import './App.css';
import TodoTask from './Components/TodoTask';
import { ITask } from './Interfaces';

const App:React.FC = () => {

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadLine] = useState<number>(0);
  const [todo, setTodo] = useState<ITask[]>([]);

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    if(event.target.name === 'task'){
      setTask(event.target.value);
    }
    else{
      setDeadLine(Number(event.target.value));
    }
  }

  const addTask = () => {
    const newTask = {
      taskName: task,
      deadline: deadline,
      completed: false
    }
    setTodo([...todo, newTask]);
    setTask("");
    setDeadLine(0);
  }

  const completeTask = (taskNameToDelete: string) => {
    setTodo(todo.filter((task) =>{
      return task.taskName !== taskNameToDelete
    }))
  }

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <label>
            Task :
            <input type="text" name="task" value={task} placeholder="Add a task" onChange={handleChange}/>
          </label>

          <label>
            Deadline (days) : 
            <input type="number" name="deadline" value={deadline} placeholder="Deadline (days)" onChange={handleChange}/>
          </label>
        </div>
        <button onClick={addTask}>Add</button>
      </div>
      <div className="todoList">
        <table>
          <thead>
            <tr>
              <th className="completeCol">Completed</th>
              <th>Task</th>
              <th>Deadline (days)</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todo.map((task:ITask, key: number)=>{
              return <TodoTask key={key} task={task} completeTask={completeTask}/>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
