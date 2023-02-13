import { Table } from "flowbite-react";
import { useContext } from "react";
import { QueryClient, useMutation, useQuery } from "react-query";
import { TodoListContext } from "../App";
import { ITask, ITaskDB } from "../Interfaces";
import TodoTask from "./TodoTask";
import { fetchTasks } from '../APICall';



const ShowTasks = () =>{

    // const todo = useContext(TodoListContext);
    
    const completeTask = (taskId: number, isCompleted: boolean) => {
    //  let todoToEdit = todo.todoList.find(t => t.id === taskId)!;
    //  todoToEdit.completed = isCompleted;
    }

    const fetchTodoList = useQuery<ITaskDB[], Error>('todoList', fetchTasks);

    if (fetchTodoList.status === 'loading') {
      return <span>Loading...</span>
    }
  
    if (fetchTodoList.status === 'error') {
      return <span>Error: {fetchTodoList.error.message}</span>
    }

    return(
        <div className="todoList">

          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell>
                <span className="sr-only">
                  Done
                </span> 
              </Table.HeadCell>
              <Table.HeadCell>
                Task
              </Table.HeadCell>
              <Table.HeadCell>
                Date
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">
                  Edit
                </span> 
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">
                  Delete
                </span> 
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {fetchTodoList.data!.map((task:ITaskDB, key: number)=>{
                return <TodoTask key={key} task={task} completeTask={completeTask}/>
              })}
            </Table.Body>
          </Table>
        {/* <table>
          <thead>
            <tr>
              <th className="completeCol">Completed</th>
              <th>Task</th>
              <th>Deadline (days)</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todo.todoList.map((task:ITask, key: number)=>{
              return <TodoTask key={key} task={task} completeTask={completeTask}/>
            })}
          </tbody>
        </table> */}
      </div>
    );
}
export default ShowTasks;