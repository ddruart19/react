import { Button, Card, TextInput } from "flowbite-react";
import { Field, FieldProps, Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { forgottenPassword } from "../APICall";
import { useState } from "react";

interface FormValues{
    email: string;
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
    .required('Email is required')
  });
  
  const initialValues : FormValues = {            
    email : ""
};
const ForgottenPasswordForm = () => {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState("")

    const resetPassword = (email: string) => {
        forgottenPassword(email).then((res) => res.json()).then(data => {
            if(data.message)setErrorMessage(data.message)
            else setErrorMessage("")
        })
    }

    return (
        <>
        <Card className="w-full md:w-4/5 lg:w-2/5 m-auto">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Reset password
        </h5>
         <Formik
            initialValues={initialValues}
            validationSchema={Validators}
            onSubmit={(values, actions) => {
                resetPassword(values.email)
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
                    <span>{errorMessage}</span>
                    <Button type="submit">Send email</Button>
                </Form>
            </Formik>
        </Card>
        </>
    )
}

export default ForgottenPasswordForm