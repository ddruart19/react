import { Button, Card, Table, TextInput } from "flowbite-react";
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
          <Card>
            <form onSubmit={(event) => {event.preventDefault(); handleSubmit()}} className="w-full lg:w-4/5 mx-auto">
                <TextInput
                    id="searchBar"
                    value={searchValue}
                    type="text"
                    placeholder="Search for a task"
                    onChange={handleChange}
                    required={true}
                />
                <div className="flex flex-col md:flex-row">
                  <Button type="submit" className="grow">
                      Search
                  </Button>
                  <Button onClick={resetFilter} className="grow">
                      Reset filter
                  </Button>
                </div>
            </form>
          </Card>

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
                    todoListFilter.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((task:ITaskDB, key: number)=>{
                      return <TodoTask key={key} task={task} completeTask={completeTask}/>
                    })
                  )
                } else if(fetchTodoList.data){
                  return (
                    fetchTodoList.data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((task:ITaskDB, key: number)=>{
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