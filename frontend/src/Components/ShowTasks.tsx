import { Button, Table, TextInput } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import { fetchTaskByName } from "../APICall";
import { useFetchAllTasks } from "../functions";
import { ITaskDB } from "../Interfaces";
import TodoTask from "./TodoTask";



const ShowTasks = () =>{

    // const todo = useContext(TodoListContext);
    
    const completeTask = (taskId: number, isCompleted: boolean) => {
    //  let todoToEdit = todo.todoList.find(t => t.id === taskId)!;
    //  todoToEdit.completed = isCompleted;
    }

    const [searchValue, setSearchValue] = useState("");
    const [todoListFilter, setTodoListFilter] = useState<ITaskDB[] | undefined>(undefined)
    const fetchTodoList = useFetchAllTasks()




    const handleSubmit = () => {
      fetchTaskByName(searchValue).then(res => {setTodoListFilter(res)})
    }
    
    const handleChange = (event : React.FormEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value)
    }

    const resetFilter = () => {
      setTodoListFilter(undefined)
    }

    if (fetchTodoList.status === 'loading') {
      return <span>Loading...</span>
    }
  
    if (fetchTodoList.status === 'error') {
      return <span>Error: {fetchTodoList.error.message}</span>
    }


    return(
        <div className="todoList">
          <form onSubmit={(event) => {event.preventDefault(); handleSubmit()}}>
              <TextInput
                  id="searchBar"
                  value={searchValue}
                  type="text"
                  placeholder="Search for a task"
                  onChange={handleChange}
                  required={true}
              />
              <Button type="submit">
                  Search
              </Button>
              <Button onClick={resetFilter}>
                  Reset filter
              </Button>
          </form>
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

              {(() => {
                if (todoListFilter) {
                  return (
                    todoListFilter.map((task:ITaskDB, key: number)=>{
                      return <TodoTask key={key} task={task} completeTask={completeTask}/>
                    })
                  )
                } else if(fetchTodoList.data){
                  return (
                    fetchTodoList.data.map((task:ITaskDB, key: number)=>{
                      return <TodoTask key={key} task={task} completeTask={completeTask}/>
                    })
                  )
                }
              })()}

            </Table.Body>
          </Table>
      </div>
    );
}
export default ShowTasks;