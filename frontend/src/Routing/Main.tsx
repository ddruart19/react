import { ReactNode, useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { Routes, Route } from 'react-router-dom';
import CalendarTask from '../Components/CalendarTask';
import CreateTask from '../Components/CreateTask';
import EditTask from '../Components/EditTask';
import Home from '../Components/Home';
import ShowTasks from '../Components/ShowTasks';
import SignInForm from '../Components/SignInForm';
import SignUpForm from '../Components/SignUpForm';
import TimelineList from '../Components/TimelineList';
import { isConnected } from '../functions';
import authContext from '../Hooks/authContext';
import ForgottenPasswordForm from '../Components/ForgottenPasswordForm';

const queryClient = new QueryClient();




const Main = () => {
    
    const { authenticated, setAuthenticated } = useContext(authContext);

    const authorizationRedirection = (element: ReactNode) => {
        return authenticated ? element : <SignInForm/>
    }

    return (   
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path='/' element={authorizationRedirection(<Home/>)} />
                <Route path='/create' element={authorizationRedirection(<CreateTask/>)} />
                <Route path='/list' element={authorizationRedirection(<ShowTasks/>)} />
                {/* <Route path='/edit/:id' element={authorizationRedirection(<EditTask/>)}/> */}
                <Route path='/timeline' element={authorizationRedirection(<TimelineList/>)}/>
                <Route path='/calendar' element={authorizationRedirection(<CalendarTask/>)}/>
                <Route path='/signup' element={<SignUpForm/>}/>
                <Route path='/signin' element={<SignInForm/>}/>
                <Route path='/forgotten-password' element={<ForgottenPasswordForm/>}/>

            </Routes>
            <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    );
}
export default Main;