import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import { useContext, useState } from "react";
import { TodoListContext } from "../App";
import { ITask } from "../Interfaces";
import { create } from "domain";

interface TodoEvent {
    title: string;
    date: Date;
}

const CalendarTask:React.FC = () => {

    const todo = useContext(TodoListContext);
    const [listEvent, setListEvent] = useState<TodoEvent[]>([]);
    

    const createEvents = () => {
        
        todo.todoList.map((task:ITask, key: number)=>{
            listEvent.push({title: task.taskName, date: new Date()});
          });
          console.log(listEvent);
    }
    
    return (
        <div>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={createEvents}
            />
        </div>
    );
}

export default CalendarTask;