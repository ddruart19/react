import { useContext } from "react";
import 'flowbite';
import { Formik, Form, Field, FieldProps, ErrorMessage} from 'formik';
import { Button, Textarea, TextInput } from "flowbite-react";
import { TodoListContext } from "../App";
import * as Yup from "yup";
import { useNavigate } from "react-router";
interface FormValues{
  taskName : string;
  deadline: string;
  date: string;
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

const Validators = Yup.object().shape({
  taskName: Yup.string()
    .min(2, 'Too short !')
    .required('Task name required')
}

);

const CreateTask = () => {

    const todo = useContext(TodoListContext);
    const navigate = useNavigate();
    const initialValues : FormValues = {taskName: "", deadline: "", date: ""};

    const addTask = (values : FormValues) => {
        const newTask = {
          id: todo.todoList.length + 1,
          taskName: values.taskName,
          deadline: Number(values.deadline),
          completed: false,
          date: values.date
        }
        todo.todoList.push(newTask);
        todo.setTodoList(todo.todoList);
        console.log(todo.todoList);
      }

    

    return (
      <>
        <Formik
        initialValues={initialValues}
        validationSchema={Validators}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
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
                {msg => <span style={{color: 'red'}}>{msg}</span>}
              </ErrorMessage>
            </div>

            <label>
              Date : 
              <Field name="date" type="date" component={InputDate}/>
            </label>

            <Button type="submit">Add</Button>
          </Form>
        </Formik>
       </>
        )
}
export default CreateTask;