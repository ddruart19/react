import { ITask } from "../Interfaces";

interface Props{
    task: ITask;
    completeTask(taskNameToDelete: string): void;
}

const TodoTask = ({task, completeTask}: Props) =>{
    return(
        <tr>
            <th className="completeCol"><input type="checkbox" checked/></th>
            <td>{task.taskName}</td>
            <td>{task.deadline}</td>
            <td><button onClick={()=>{
                completeTask(task.taskName)
            }}>X</button></td>
        </tr>
    )
}

export default TodoTask;