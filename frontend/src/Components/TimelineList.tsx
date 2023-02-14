import 'flowbite';
import { Timeline } from "flowbite-react";
import { useFetchAllTasks } from '../App';
import { ITask, ITaskDB } from '../Interfaces';
import TimelineItem from './TimelineItem';


const sortTask = (list: ITaskDB[]) =>{
    return list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

const TimelineList: React.FC = () =>{
    // const todo = useContext(TodoListContext);
    const fetchTodoList = useFetchAllTasks();

    if (fetchTodoList.status === 'loading') return <span>Loading...</span>
    
    if (fetchTodoList.status === 'error') return <span>Error: {fetchTodoList.error.message}</span>
    
    if(fetchTodoList.data)
        return (
            <>
            <Timeline>
                {sortTask(fetchTodoList.data).map((task:ITask, key: number) => {
                    return <TimelineItem task={task} key={key}/>
                })}
            </Timeline>
            </>
        );
    return (<></>)
}

export default TimelineList;