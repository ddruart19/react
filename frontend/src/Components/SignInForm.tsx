import { Button, TextInput } from "flowbite-react";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { CSSProperties } from "react";
import { useQuery } from "react-query";
import * as Yup from "yup";
import { authUser } from "../APICall";

const divErrorStyles: CSSProperties = {
    color: 'red',
}

interface FormValues{
    email: string;
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
    password: Yup.string()
      .required('Password is required')
  });

const userAuthentication = (values: FormValues) => {
    authUser(values).then(res => {
        if(res.status === 409)res.json().then(data => alert(data.message))
        else{
            alert("Token creation here")
        }
    })
}

const SignInForm = () => {

    const initialValues : FormValues = {            
        email : "",
        password : ""
    };

    return (
        <>
         <Formik
            initialValues={initialValues}
            validationSchema={Validators}
            onSubmit={(values, actions) => {
                userAuthentication(values);
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
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label>
                            Password :
                            <Field name="password" placeholder="Your password" component={InputText} type="password"/>
                        </label>
                        <ErrorMessage name="userPwd">
                            {msg =>{
                            // setColorOfInputName("failure");
                            return <span style={divErrorStyles}>{msg}</span>;
                            } }
                        </ErrorMessage>
                    </div>

                    <Button type="submit">Sign in</Button>
                </Form>
            </Formik>
        </>
    )
}

export default SignInForm