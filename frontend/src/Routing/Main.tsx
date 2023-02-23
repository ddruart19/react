import { Routes, Route } from 'react-router-dom';
import CalendarTask from '../Components/CalendarTask';
import CreateTask from '../Components/CreateTask';
import EditTask from '../Components/EditTask';
import Home from '../Components/Home';
import ShowTasks from '../Components/ShowTasks';
import SignUpForm from '../Components/SignUpForm';
import TimelineList from '../Components/TimelineList';



const Main = () => {
    return (   
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/create' element={<CreateTask/>} />
            <Route path='/list' element={<ShowTasks/>} />
            <Route path='/edit/:id' element={<EditTask/>}/>
            <Route path='/timeline' element={<TimelineList/>}/>
            <Route path='/calendar' element={<CalendarTask/>}/>
            <Route path='/signup' element={<SignUpForm/>}/>
        </Routes>
    );
}
export default Main;