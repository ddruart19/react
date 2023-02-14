import React, {  } from 'react';
import './App.css';
import Header from './Components/Header';
import Main from './Routing/Main';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ITaskDB } from './Interfaces';
import { fetchTasks } from './APICall';

// export const TodoListContext = createContext<{todoList: ITask[], setTodoList: (list: ITask[]) => void}>({
//   todoList: [], 
//   setTodoList: (list: ITask[]) => {}
// });

const queryClient = new QueryClient();

export const useFetchAllTasks = () => {
  return useQuery<ITaskDB[], Error>('todoList', fetchTasks);
}

const App:React.FC = () => {
  //Liste des tâches
  // const [todoList, setTodoList] = useState<ITask[]>([{
  //   "id": 1,
  //   "taskName": "Give dog a bath",
  //   "completed": true,
  //   "date": new Date('2023-02-05')
  // }]);


  // useEffect(() => {
  //     fetchTasks().then(res => res.json()).then(data => {
  //       setTodoList(data.map((taskDb: ITaskDB, key: number) => {
  //         return {
  //           id: taskDb.id,
  //           taskName: taskDb.name,
  //           completed: taskDb.completed,
  //           date: taskDb.date
  //         };
  //       }))
  //     })
  // }, []);

  return (
    <div className="App">
        {/* <TodoListContext.Provider value={{todoList:todoList, setTodoList:setTodoList}}> */}
        <QueryClientProvider client={queryClient}>
          <Header></Header>
          <Main></Main>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
        {/* </TodoListContext.Provider> */}
    </div>
  );
}

export default App;
