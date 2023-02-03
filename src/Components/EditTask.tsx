
import { Button, TextInput } from "flowbite-react";
import { Field, FieldProps, Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoListContext } from "../App";
import { ITask } from "../Interfaces";

interface FormValues{
    taskName : string;
    deadline: number;
  }
  
const InputText: React.FC<Text & FieldProps> = ({ field, form, ...props }) => {
    return (
      <TextInput
        {...field}
        {...props}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
      />
    );
  }
  
  const InputNumber: React.FC<Number & FieldProps> = ({ field, form, ...props }) => {
    return (
      <TextInput
        {...field}
        {...props}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
      />
    );
  }
  
const EditTask = () => {
    const todo = useContext(TodoListContext);
    const navigate = useNavigate();

    //URL ID
    const {id} = useParams<string>();

    let todoEdit:ITask = todo.todoList.find(t => t.id == Number(id))!;

    const [task, setTask] = useState<string>(todoEdit ? todoEdit.taskName : "");
    const [deadline, setDeadline] = useState<number>(todoEdit ? todoEdit.deadline : 0);


    const initialValues : FormValues = {taskName: todoEdit.taskName, deadline: todoEdit.deadline};

    if(id){
        return(
            <>
                <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                console.log({ values, actions });
                todoEdit.taskName = values.taskName;
                todoEdit.deadline = values.deadline;
                actions.setSubmitting(false);
                navigate('/list');
                }}
                >
                <Form className="flex flex-col gap-4">
                    <div>
                    <label>
                        Task :
                        <Field name="taskName" placeholder="Your task" component={InputText}/>
                    </label>
                    </div>


                    <label>
                    Deadline (days) : 
                    <Field name="deadline" placeholder="Deadline (days)" component={InputNumber}/>
                    </label>
                    <Button type="submit">Edit</Button>
                </Form>
                </Formik>
            </>
        );
    }
    return(
        <></>
    );
}
export default EditTask;