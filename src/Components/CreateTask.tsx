import { Button } from "flowbite-react";
import { ChangeEvent, useContext, useState } from "react";
import { TodoListContext } from "../Routing/Main"
import 'flowbite';

const CreateTask = () => {

    const [task, setTask] = useState<string>("");
    const [deadline, setDeadLine] = useState<number>(0);
    const todo = useContext(TodoListContext);

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
          id: todo.todoList.length + 1,
          taskName: task,
          deadline: deadline,
          completed: false
        }
        todo.todoList.push(newTask);
        setTask("");
        setDeadLine(0);
      }

    return (
        <div className="creationForm">
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
    );
}
export default CreateTask;