
import { ChangeEvent, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ITask } from "../Interfaces";
import { TodoListContext } from "../Routing/Main";


const EditTask = () => {
    const todo = useContext(TodoListContext);

    //URL ID
    const {id} = useParams<string>();

    let todoEdit:ITask = todo.todoList.find(t => t.id == Number(id))!;

    const [task, setTask] = useState<string>(todoEdit ? todoEdit.taskName : "");
    const [deadline, setDeadline] = useState<number>(todoEdit ? todoEdit.deadline : 0);

    const handleChangeTask = (event:ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    }

    const handleChangeDeadline = (event: ChangeEvent<HTMLInputElement>) => {
        setDeadline(Number(event.target.value));
    }

    const editTodo = () => {
        todoEdit.taskName = task;
        todoEdit.deadline = deadline;
        todo.setTodoList(todo.todoList);
    };

    if(id){
        return(
            <>
                <input type="text" name="task" value={task} onChange={handleChangeTask}/>
                <input type="number" name="deadline" value={deadline} onChange={handleChangeDeadline}/>
                <button onClick={editTodo}>Edit</button>
            </>
        );
    }
    return(
        <></>
    );
}
export default EditTask;