import * as yup from "yup";

export const loginValidationSchema = yup.object({
    email: yup.string().required("Email is required!").email("Must be an email!"),
    password: yup.string().required("Password is required!"),
});


export const forgetPasswordValidationSchema = yup.object({
    email: yup
        .string()
        .trim()
        .required("Email is required!")
        .email("Email is invalid!"),
});
