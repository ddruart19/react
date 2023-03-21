import { Checkbox, Table } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteTask, updateTask } from "../APICall";
import { showFullDate } from "../functions";
import { ITask } from "../Interfaces";

interface Props{
    task: ITask;
    completeTask(taskId: number, isCompleted: boolean): void;
}

const TodoTask: React.FC<Props> = ({task, completeTask}: Props) =>{
    const[isChecked, setIsChecked] = useState(task.completed);
    const queryClient = useQueryClient()
    const deleteMutation = useMutation(deleteTask, {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries('todoList')
        },
      })

    const checkMutation = useMutation(updateTask, {
        onSuccess: () => {
            queryClient.invalidateQueries('todoList')
        }
    })

    // const todo = useContext(TodoListContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        // setIsChecked(e.target.checked);
        // completeTask(task.id, e.target.checked);
        validateTask()
    }

    const validateTask = () => {
        let checkedTask: ITask = {
            id: task.id,
            name: task.name,
            completed: !task.completed,
            date: task.date
        }
        checkMutation.mutate(checkedTask)
    }

    const confirmDelete = (task:ITask) => {
        if(window.confirm('Are you sure you want to delete ' + task.name + '?')){
            deleteMutation.mutate(String(task.id))
        }
    }
    return(

        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"> 
            <Table.Cell className="!p-4">
                {/* <Checkbox checked={isChecked} onChange={handleChange}/> */}
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleChange}
                />
            </Table.Cell>
            <Table.Cell>
                {task.name}
            </Table.Cell>
            <Table.Cell>
                {showFullDate(task.date)}
            </Table.Cell>
            <Table.Cell>
                <Link href={"/edit/" + task.id}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Edit
                </Link>
            </Table.Cell>
            <Table.Cell>
                <Link href="" style={{color:'red'}}
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