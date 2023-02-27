import { Button, TextInput } from "flowbite-react";
import { Formik, Field, FieldProps, Form } from "formik";
import { useState } from "react";

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

const logIn = (values: FormValues) => {
    alert("Email : " + values.email + "\nPwd : " + values.password)
}

const SignInForm = () => {
    const [initialValues, setInitialValues] = useState<FormValues>({
        email: "",
        password: ""
    })

    return (
        <>
             <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
            logIn(values)
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
                    </div>
                    <Button type="submit">Sign in</Button>
                </Form>
            </Formik>
        </>
    )
}
export default SignInForm