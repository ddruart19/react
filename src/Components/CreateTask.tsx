import { useContext } from "react";
import 'flowbite';
import { Formik, Form, Field, FieldProps} from 'formik';
import { Button, TextInput } from "flowbite-react";
import { TodoListContext } from "../App";

interface FormValues{
  taskName : string;
  deadline: string;
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

const CreateTask = () => {

    const todo = useContext(TodoListContext);

    const initialValues : FormValues = {taskName: "", deadline: ""};

    const addTask = (values : FormValues) => {
        const newTask = {
          id: todo.todoList.length + 1,
          taskName: values.taskName,
          deadline: Number(values.deadline),
          completed: false
        }
        todo.todoList.push(newTask);
        todo.setTodoList(todo.todoList);
        console.log(todo.todoList);
      }

    

    return (
      <>
        <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          addTask(values);
          actions.setSubmitting(false);
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
              <Field name="deadline" type="number" min="0" placeholder="Deadline (days)" component={InputNumber}/>
            </label>
            <Button type="submit">Add</Button>
          </Form>
        </Formik>
       </>
        )
}
export default CreateTask;