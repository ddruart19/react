import { Checkbox, Table } from "flowbite-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { deleteTask } from "../APICall";
import { TodoListContext } from "../App";
import { showFullDate } from "../functions";
import { ITask } from "../Interfaces";

interface Props{
    task: ITask;
    completeTask(taskId: number, isCompleted: boolean): void;
}

const TodoTask: React.FC<{task: ITask, completeTask: any}> = ({task, completeTask}: Props) =>{
    const[isChecked, setIsChecked] = useState(task.completed);

    const todo = useContext(TodoListContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setIsChecked(e.target.checked);
        completeTask(task.id, e.target.checked);
    }

    const confirmDelete = (task:ITask) => {
        if(window.confirm('Are you sure you want to delete ' + task.taskName + '?')){
            todo.setTodoList(todo.todoList.filter(t => t.id !== task.id));
            deleteTask(String(task.id));
        }
    }
    return(

        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"> 
            <Table.Cell className="!p-4">
                <Checkbox checked={isChecked} onChange={handleChange}/>
            </Table.Cell>
            <Table.Cell>
                {task.taskName}
            </Table.Cell>
            <Table.Cell>
                {showFullDate(task.date)}
            </Table.Cell>
            <Table.Cell>
                <Link to={"/edit/" + task.id}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Edit
                </Link>
            </Table.Cell>
            <Table.Cell>
                <Link to="" style={{color:'red'}}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500" onClick={() => confirmDelete(task)}>
                    Delete
                </Link>
            </Table.Cell>
        </Table.Row>
        // <tr>
        //     <td className="completeCol"><Checkbox handleChange={handleChange} isChecked={isChecked} label={"completed"} /></td>
        //     <td>
        //         <Link to={"/edit/" + task.id}>
        //             {task.taskName}
        //         </Link>
        //     </td>
        //     <td>{task.deadline}</td>
        //     <td><button onClick={()=>{
        //         completeTask(task.taskName)
        //     }}>X</button></td>
        // </tr>
    )
}

export default TodoTask;