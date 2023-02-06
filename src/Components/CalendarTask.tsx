import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import { CSSProperties, useContext, useEffect, useState } from "react";
import { TodoListContext } from "../App";
import { ITask } from "../Interfaces";

interface TodoEvent {
    title: string;
    date: string;
    color: string;
}

const divCalendarStyles: CSSProperties = {
    width: '80%',
    margin: '0 auto'
}

const CalendarTask:React.FC = () => {

    const todo = useContext(TodoListContext);
    const [listEvent, setListEvent] = useState<TodoEvent[]>([]);
    

    const createEvents = () => {
        
        const newEvents = todo.todoList.map((task:ITask) => {
            return { title: task.taskName, date: task.date, color: task.completed ? 'green' : 'blue'};
        });
        setListEvent(newEvents);
    }

    useEffect(() => {
        createEvents();
    }, []);
    
    return (
        <div style={divCalendarStyles}>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={listEvent}
                height='85vh'
            />
        </div>
    );
}

export default CalendarTask;