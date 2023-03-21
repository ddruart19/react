import { CSSProperties, useContext, useState } from "react";
import 'flowbite';
import { Formik, Form, Field, FieldProps, ErrorMessage} from 'formik';
import { Button, Card, Textarea, TextInput } from "flowbite-react";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { createTask } from "../APICall";
import { useMutation, useQueryClient } from "react-query";
import { formatDate } from "../functions";
import { useRouter } from "next/router";

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
  const router = useRouter()

  const queryClient = useQueryClient()
  const createMutation = useMutation(createTask, {
    onSuccess : () => {
      queryClient.invalidateQueries('todoList');
    }
  })

  const styleCard: CSSProperties = {
    margin: '0 auto',
    
  }

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
      .required('Task name required')
  });
    // const todo = useContext(App.TodoListContext);
    const initialValues : FormValues = {taskName: "", taskDate: formatDate(new Date())};

    const addTask = async (values : FormValues) => {
        createMutation.mutate({
          name : values.taskName,
          completed: false,
          date: new Date(values.taskDate)
        });
    }

    

    return (
      <>
      <Card className="w-full md:w-4/5" style={styleCard}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Task creation
        </h5>
        <Formik
        initialValues={initialValues}
        validationSchema={Validators}
        onSubmit={(values, actions) => {
          addTask(values);
          actions.setSubmitting(false);
          router.push('/list');
        }}
        >
          <Form className="flex flex-col gap-4">
            <div>
              <label>
                Task :
                <Field name="taskName" placeholder="Mow the lawn.." component={InputText}/>
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
        </Card>
       </>
        )
}
export default CreateTask;