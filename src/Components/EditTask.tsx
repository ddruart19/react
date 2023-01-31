import { useContext } from "react";
import { useParams } from "react-router-dom";
import { TodoListContext } from "../Routing/Main";


const EditTask = () => {
    const todo = useContext(TodoListContext);

    //URL ID
    const {id} = useParams<string>();

   
    if(id){
        let todoEdit = todo.todoList.find(t => t.id == parseInt(id));
        if(todoEdit)
            return(
                <>
                <input type="text" value={todoEdit.taskName}/>
                <input type="number" value={todoEdit.deadline}/>
                </>
            );
    }
    return(
        <></>
    );
}
export default EditTask;