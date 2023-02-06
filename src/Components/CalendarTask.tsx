import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import { useContext, useEffect, useState } from "react";
import { TodoListContext } from "../App";
import { ITask } from "../Interfaces";
import { create } from "domain";

interface TodoEvent {
    title: string;
    date: string;
}

const CalendarTask:React.FC = () => {

    const todo = useContext(TodoListContext);
    const [listEvent, setListEvent] = useState<TodoEvent[]>([]);
    

    const createEvents = () => {
        
        const newEvents = todo.todoList.map((task:ITask) => {
            return { title: task.taskName, date: task.date};
        });
        setListEvent(newEvents);
    }

    useEffect(() => {
        createEvents();
    }, [createEvents, todo.todoList]);
    
    return (
        <div>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={listEvent}
            />
        </div>
    );
}

export default CalendarTask;