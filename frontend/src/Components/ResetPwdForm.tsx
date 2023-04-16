import { Button, Card, TextInput } from "flowbite-react";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik"
import { CSSProperties, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";
import { createUser, isResetTokenValid } from "../APICall";

const divErrorStyles: CSSProperties = {
    color: 'red',
}

const styleCard: CSSProperties = {
    margin: '0 auto'
}

interface FormValues{
    password: string;
    userPwdConfirm: string;
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
    password: Yup.string()
      .required('Password is required'),
    userPwdConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password must match')
  });

interface ComponentProps {
    token: string;
}

const ResetPwdForm: React.FC<ComponentProps> = ({token}) => {
    
    const [isTokenValid, setIsTokenValid]=  useState(false)

    isResetTokenValid(token).then(res => setIsTokenValid(res))

    const initialValues : FormValues = {            
        password : "",
        userPwdConfirm: ""
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
    if(!isTokenValid){
        return(
            <>
                Token is not valid
            </>
        )
    }
    return (
        <>
        <Card className="w-full md:w-4/5 lg:w-2/5" style={styleCard}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Change password
        </h5>
            <Formik
            initialValues={initialValues}
            validationSchema={Validators}
            onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            }}
            >
                <Form className="flex flex-col gap-4">
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
                            return <span style={divErrorStyles}>{msg}</span>;
                            } }
                        </ErrorMessage>
                    </div>
                    <Button type="submit">Confirm change</Button>
                </Form>
            </Formik>
        </Card>
        </>
    )
}
export default ResetPwdForm