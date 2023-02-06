import 'flowbite';
import { Timeline } from "flowbite-react";
import { useContext } from 'react';
import { TodoListContext } from '../App';
import { ITask } from '../Interfaces';
import TimelineItem from './TimelineItem';


const sortTask = (list: ITask[]) =>{
    return list.sort((a, b) => Number(a.date) - Number(b.date));
}

const TimelineList: React.FC = () =>{
    const todo = useContext(TodoListContext);
    return (
        <>
        <Timeline>
            {sortTask(todo.todoList).map((task:ITask, key: number) => {
                return <TimelineItem task={task} key={key}/>
            })}
        </Timeline>
        </>
    );
}

export default TimelineList;