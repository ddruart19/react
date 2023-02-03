import { Routes, Route } from 'react-router-dom';
import CreateTask from '../Components/CreateTask';
import EditTask from '../Components/EditTask';
import Home from '../Components/Home';
import ShowTasks from '../Components/ShowTasks';
import TimelineList from '../Components/TimelineList';



const Main = () => {
    return (   
        <Routes>
            <Route path='/' element={<ShowTasks/>} />
            <Route path='/create' element={<CreateTask/>} />
            <Route path='/list' element={<ShowTasks/>} />
            <Route path='/edit/:id' element={<EditTask/>}/>
            <Route path='/timeline' element={<TimelineList/>}/>
        </Routes>
    );
}
export default Main;