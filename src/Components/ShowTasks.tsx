import { useState } from "react";
import { ITask } from "../Interfaces";
import TodoTask from "./TodoTask";

const ShowTasks = () =>{

    const [todo, setTodo] = useState<ITask[]>([]);

    const completeTask = (taskNameToDelete: string) => {
        setTodo(todo.filter((task) =>{
          return task.taskName !== taskNameToDelete
        }))
      }

    return(
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
    );
}
export default ShowTasks;