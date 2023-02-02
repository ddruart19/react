import { Table } from "flowbite-react";
import { useContext } from "react";
import { ITask } from "../Interfaces";
import { TodoListContext } from "../Routing/Main";
import TodoTask from "./TodoTask";

const ShowTasks = () =>{

    const todo = useContext(TodoListContext);

    const completeTask = (taskId: number, isCompleted: boolean) => {
     let todoToEdit = todo.todoList.find(t => t.id === taskId)!;
     todoToEdit.completed = isCompleted;
    }

    

    return(
        <div className="todoList">
          <button onClick={() => console.log(todo.todoList)}>Show todoList</button>
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
                Deadline
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">
                  Edit
                </span> 
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {todo.todoList.map((task:ITask, key: number)=>{
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