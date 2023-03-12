import { Button, TextInput } from "flowbite-react";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { CSSProperties, useContext } from "react";
import * as Yup from "yup";
import { authUser, fetchTasks } from "../APICall";
import authContext from "../Hooks/authContext";

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



const SignInForm = () => {
    const { authenticated, setAuthenticated } = useContext(authContext);

    const userAuthentication = (values: FormValues) => {
        authUser(values).then(res => res.json()).then(data => {
            if(data.id){
                alert("Connection successfull")
                setAuthenticated(true)
            }
        }).catch(error => alert("Connection failed"))
    }

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