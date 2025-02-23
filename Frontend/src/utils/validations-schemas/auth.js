import * as yup from "yup";

export const loginValidationSchema = yup.object({
  email: yup.string().required("Email is required!").email("Must be an email!"),
  password: yup.string().required("Password is required!"),
});

export const registerValidationSchema = yup.object({
  firstName: yup.string().trim().required("First Name is required"),
  lastName: yup.string().trim().required("Last Name is required"),
  contactNumber: yup.string().trim().required("Contact Number is required"),
  email: yup
    .string()
    .trim()
    .required("Email is required!")
    .email("Must be an email!"),
  password: yup.string().required("Password is required!"),
});

export const forgetPasswordValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email is required!")
    .email("Email is invalid!"),
});

export const checkoutValidationSchema = yup.object({
  firstName: yup.string().trim().required("First Name is required"),
  lastName: yup.string().trim().required("Last Name is required"),
  contactNumber: yup.string().trim().required("Contact Number is required"),
  email: yup
    .string()
    .trim()
    .required("Email is required!")
    .email("Must be an email!"),
  add1: yup.string().trim().required("Address is required"),
  add2: yup.string().trim().optional("Address is required"),
  postcode: yup.string().trim().required("Postcode is required"),
  instructions: yup.string().trim().optional("Delivery Instructions"),

});