import { Button, TextInput } from "flowbite-react";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik"
import { CSSProperties } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";
import { createUser } from "../APICall";

const divErrorStyles: CSSProperties = {
    color: 'red',
}

interface FormValues{
    email: string;
    name: string;
    surname: string;
    password: string;
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

const Validators = Yup.object().shape({
    email: Yup.string()
    .required('Email is required'),
    name: Yup.string()
    .required('Name is required'),
    surname: Yup.string()
    .required('Surname is required'),
    password: Yup.string()
      .required('Password is required'),
    userPwdConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password must match')
  });



const SignUpForm = () => {
    
    const initialValues : FormValues = {            
        email : "",
        name : "",
        surname : "",
        password : ""
    };

    const createUserMutation = useMutation(createUser, {
        onSuccess : (response: Response) => {
            console.log(response)
            response.json().then(data => alert(data.message))
        },
        onError: (error: Error) => {
            console.error("Error while creating user", error.message)
            alert(error.message)
        }
    })

    const addUser = async (values: FormValues) => {
        createUserMutation.mutate({
            email : values.email,
            name : values.name,
            surname : values.surname,
            password : values.password
          });
    }
    
    return (
        <>
            <Formik
            initialValues={initialValues}
            validationSchema={Validators}
            onSubmit={(values, actions) => {
            addUser(values)
            actions.setSubmitting(false);
            }}
            >
                <Form className="flex flex-col gap-4">
                    {/* EMAIL */}
                    <div>
                        <label>
                            Email :
                            <Field name="email" placeholder="Your email" component={InputText} type="email"/>
                        </label>
                        <ErrorMessage name="email">
                            {msg =>{
                            // setColorOfInputName("failure");
                            return <span style={divErrorStyles}>{msg}</span>;
                            } }
                        </ErrorMessage>
                    </div>
                    {/* NAME */}
                    <div>
                        <label>
                            Name :
                            <Field name="name" placeholder="Your name" component={InputText}/>
                        </label>
                        <ErrorMessage name="name">
                            {msg =>{
                            // setColorOfInputName("failure");
                            return <span style={divErrorStyles}>{msg}</span>;
                            } }
                        </ErrorMessage>
                    </div>
                    {/* SURNAME */}
                    <div>
                        <label>
                            Surname :
                            <Field name="surname" placeholder="Your surname" component={InputText}/>
                        </label>
                        <ErrorMessage name="surname">
                            {msg =>{
                            // setColorOfInputName("failure");
                            return <span style={divErrorStyles}>{msg}</span>;
                            } }
                        </ErrorMessage>
                    </div>
                    {/* PASSWORD */}
                    <div>
                        <label>
                            Password :
                            <Field name="password" placeholder="Your password" component={InputText} type="password"/>
                        </label>
                        <ErrorMessage name="password">
                            {msg =>{
                            // setColorOfInputName("failure");
                            return <span style={divErrorStyles}>{msg}</span>;
                            } }
                        </ErrorMessage>
                    </div>
                    {/* PASSWORD CONFIRM */}
                    <div>
                        <label>
                            Password confirmation :
                            <Field name="userPwdConfirm" placeholder="Password confirmation" component={InputText} type="password"/>
                        </label>
                        <ErrorMessage name="userPwdConfirm">
                            {msg =>{
                            // setColorOfInputName("failure");
                            return <span style={divErrorStyles}>{msg}</span>;
                            } }
                        </ErrorMessage>
                    </div>
                    <Button type="submit">Sign up</Button>
                </Form>
            </Formik>
        </>
    )
}
export default SignUpForm