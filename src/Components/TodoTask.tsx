import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ITask } from "../Interfaces";
import Checkbox from "./Checkbox";

interface Props{
    task: ITask;
    completeTask(taskNameToDelete: string): void;
}


const TodoTask = ({task, completeTask}: Props) =>{
    const[isChecked, setIsChecked] = useState(task.completed);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setIsChecked(e.target.checked);
        task.completed = e.target.checked;
        console.log(task.completed);
    }
    return(
        <tr>
            <td className="completeCol"><Checkbox handleChange={handleChange} isChecked={isChecked} label={"completed"} /></td>
            <td>
                <Link to={"/edit/" + task.id}>
                    {task.taskName}
                </Link>
            </td>
            <td>{task.deadline}</td>
            <td><button onClick={()=>{
                completeTask(task.taskName)
            }}>X</button></td>
        </tr>
    )
}

export default TodoTask;