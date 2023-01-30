import { Routes, Route } from 'react-router-dom';
import CreateTask from '../Components/CreateTask';
import Home from '../Components/Home';
import ShowTasks from '../Components/ShowTasks';

const Main = () => {
return (         
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/create' element={<CreateTask/>} />
        <Route path='/list' element={<ShowTasks/>} />
    </Routes>
);
}
export default Main;