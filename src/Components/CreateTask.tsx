import { ChangeEvent, useContext, useState } from "react";
import { TodoListContext } from "../Routing/Main"
import 'flowbite';
import { Formik, FormikHelpers, Form, Field} from 'formik';

interface FormValues{
  taskName : string;
  deadline: number;
}

const CreateTask = () => {

    const todo = useContext(TodoListContext);

    const initialValues : FormValues = {taskName: "", deadline: 0};

    const addTask = (values : FormValues) => {
        const newTask = {
          id: todo.todoList.length + 1,
          taskName: values.taskName,
          deadline: values.deadline,
          completed: false
        }
        todo.todoList.push(newTask);
        todo.setTodoList(todo.todoList);
        console.log(todo.todoList);
      }

    return (
        <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          addTask(values);
          actions.setSubmitting(false);
        }}
        >
          <Form>
            <label>
              Task :
              <Field name="taskName" placeholder="Your task"/>
            </label>

            <label>
              Deadline (days) : 
              <Field name="deadline" placeholder="Deadline (days)"/>
            </label>
            <button type="submit">Add</button>
          </Form>
        </Formik>
        )
}
export default CreateTask;