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

const queryClient = new QueryClient();

export const useFetchAllTasks = () => {
  return useQuery<ITaskDB[], Error>('todoList', fetchTasks);
}

const App:React.FC = () => {

  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
          <Header></Header>
          <Main></Main>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    </div>
  );
}

export default App;
