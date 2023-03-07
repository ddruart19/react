import { Button, Textarea, TextInput } from "flowbite-react";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { CSSProperties } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ITaskDB } from "../Interfaces";
import * as Yup from "yup";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { fetchTaskById, UpdateTask } from "../APICall";
import { formatDate } from "../functions";

interface FormValues{
    taskName : string;
    taskDate: string;
}

const divErrorStyles: CSSProperties = {
    color: 'red',
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
    .required('Task name required'),
taskDate: Yup.date()
    .min(Date(), 'Can only set date for today or further')
});
  
const EditTask = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    //URL ID
    const {id} = useParams<string>();
    const fetchTaskByIdQuery = useQuery<ITaskDB, Error>(['fetchTaskById', id], () => fetchTaskById(id!))
    const editMutation = useMutation(UpdateTask, {
        onSuccess : () => {
            queryClient.invalidateQueries('todoList');
        }
    })

    const taskEdition = (values : FormValues) => {
        editMutation.mutate({
            name : values.taskName,
            completed: fetchTaskByIdQuery.data!.completed,
            date: new Date(values.taskDate),
            id: Number(id)
          })
    }

    if (fetchTaskByIdQuery.status === 'loading') {
        return <span>Loading...</span>
      }
    
      if (fetchTaskByIdQuery.status === 'error') {
        return <span>Error: </span>
      }
  

    if(id && fetchTaskByIdQuery.data){
        // console.log(fetchTaskByIdQuery.data.date.getTime().toString().slice());
        // console.log(new Date(fetchTaskByIdQuery.data!.date))
        // const initialValues : FormValues = {taskName: todoEdit.taskName, taskDate: "2022-02-01"};
        return(
            <>
                <Formik
                initialValues={{taskName : fetchTaskByIdQuery.data.name, taskDate : formatDate(new Date(fetchTaskByIdQuery.data.date))}}
                validationSchema={Validators}
                onSubmit={(values, actions) => {
                taskEdition(values);
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
                            {msg => <span style={divErrorStyles}>{msg}</span>}
                        </ErrorMessage>
                    </div>
                    <div>
                        <label>
                            Date :
                            <Field name="taskDate" type="date" component={InputDate}/>
                        </label>
                        <ErrorMessage name="taskDate">
                            {msg => <span style={divErrorStyles}>{msg}</span>}
                        </ErrorMessage>
                    </div>

                    <Button type="submit">Edit</Button>
                </Form>
                </Formik>
            </>
        );
    }
    return(
        <><h2>No task found</h2></>
    );
}
export default EditTask;