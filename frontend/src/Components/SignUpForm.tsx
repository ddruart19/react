import { Button, TextInput } from "flowbite-react";
import { Field, FieldProps, Form, Formik, FormikHelpers, FormikValues } from "formik"


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

const SignUpForm = () => {
    return (
        <>
            <Formik
            initialValues={{}}
            onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            }}
            >
                <Form className="flex flex-col gap-4">
                    {/* EMAIL */}
                    <div>
                        <label>
                            Email :
                            <Field name="userEmail" placeholder="Your email" component={InputText} type="email"/>
                        </label>
                    </div>
                    {/* NAME */}
                    <div>
                        <label>
                            Name :
                            <Field name="userName" placeholder="Your name" component={InputText}/>
                        </label>
                    </div>
                    {/* SURNAME */}
                    <div>
                        <label>
                            Surname :
                            <Field name="userSurname" placeholder="Your surname" component={InputText}/>
                        </label>
                    </div>
                    {/* PASSWORD */}
                    <div>
                        <label>
                            Password :
                            <Field name="userPwd" placeholder="Your password" component={InputText} type="password"/>
                        </label>
                    </div>
                    {/* PASSWORD CONFIRM */}
                    <div>
                        <label>
                            Password confirmation :
                            <Field name="userPwdConfirm" placeholder="Password confirmation" component={InputText} type="password"/>
                        </label>
                    </div>
                    <Button type="submit">Sign up</Button>
                </Form>
            </Formik>
        </>
    )
}
export default SignUpForm