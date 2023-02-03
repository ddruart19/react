import 'flowbite';
import { Timeline } from "flowbite-react";
import { useContext } from 'react';
import { TodoListContext } from '../App';
import { ITask } from '../Interfaces';
import TimelineItem from './TimelineItem';


const sortTask = (list: ITask[]) =>{
    return list.sort((a, b) => a.deadline - b.deadline);
}

const TimelineList: React.FC = () =>{
    const todo = useContext(TodoListContext);
    return (
        <>
        <Timeline>
            {sortTask(todo.todoList).map((task:ITask) => {
                return <TimelineItem task={task}/>
            })}
        </Timeline>
        </>
    );
}

export default TimelineList;