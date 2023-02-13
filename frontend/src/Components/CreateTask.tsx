import { CSSProperties, useContext, useState } from "react";
import 'flowbite';
import { Formik, Form, Field, FieldProps, ErrorMessage} from 'formik';
import { Button, Textarea, TextInput } from "flowbite-react";
import { TodoListContext } from "../App";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { createTask } from "../APICall";
interface FormValues{
  taskName : string;
  taskDate: string;
}

const divErrorStyles: CSSProperties = {
  color: 'red',
}

const CreateTask = () => {
  const [colorOfInputName, setColorOfInputName] = useState("gray");
  const [colorOfInputDate, setColorOfInputDate] = useState("gray");

  const InputText: React.FC<Text & FieldProps> = ({ field, form, ...props }) => {
    return (
      <Textarea
        {...field}
        {...props}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        rows={6}
        color={colorOfInputName}
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
        color={colorOfInputDate}
      />
    );
  }
  
  const Validators = Yup.object().shape({
    taskName: Yup.string()
      .min(2, 'Too short !')
      .required('Task name required'),
    taskDate: Yup.date()
      .min(Date(), 'Can only set date for today or further')
  });
    const todo = useContext(TodoListContext);
    const navigate = useNavigate();
    const initialValues : FormValues = {taskName: "", taskDate: "2023-02-02"};

    const addTask = async (values : FormValues) => {
        const newTask = {
          id: todo.todoList.length + 1,
          name: values.taskName,
          completed: false,
          date: new Date(values.taskDate)
        }
        todo.todoList.push(newTask);
        todo.setTodoList(todo.todoList);

        //Add task in DB
        createTask({
          name : values.taskName,
          completed: false,
          date: new Date(values.taskDate)
        }).then(res => res.json()).then(data => console.log(data)).catch(error => console.log(error));
      }

    

    return (
      <>
        <Formik
        initialValues={initialValues}
        validationSchema={Validators}
        onSubmit={(values, actions) => {
          addTask(values);
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
              <ErrorMessage name="taskName">
                {msg =>{
                  // setColorOfInputName("failure");
                  return <span style={divErrorStyles}>{msg}</span>;
                } }
              </ErrorMessage>
            </div>

            <div>
              <label>
                Date : 
                <Field name="taskDate" type="date" component={InputDate}/>
              </label>
              <ErrorMessage name="taskDate">
                  {msg => {
                    // setColorOfInputDate("failure");
                    return <span style={divErrorStyles}>{msg}</span>}
                  }
              </ErrorMessage>
            </div>
            <Button type="submit">Add</Button>
          </Form>
        </Formik>
       </>
        )
}
export default CreateTask;