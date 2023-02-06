
import { Button, Textarea, TextInput } from "flowbite-react";
import { Field, FieldProps, Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoListContext } from "../App";
import { ITask } from "../Interfaces";

interface FormValues{
    taskName : string;
    taskDate: string;
  }
  
const InputText: React.FC<Text & FieldProps> = ({ field, form, ...props }) => {
    return (
      <Textarea
        {...field}
        {...props}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        rows={6}
      />
    );
  }
  
  const InputDate: React.FC<Text & FieldProps> = ({ field, form, ...props }) => {
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
    const [date, setDate] = useState<string>(todoEdit ? todoEdit.date : "");


    const initialValues : FormValues = {taskName: todoEdit.taskName, taskDate: todoEdit.date};

    if(id){
        return(
            <>
                <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                console.log({ values, actions });
                todoEdit.taskName = values.taskName;
                todoEdit.date = values.taskDate;
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
                    <label>
                        Task :
                        <Field name="taskDate" type="date" component={InputDate}/>
                    </label>
                    </div>

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