import * as yup from "yup";

const userValidationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  nombre: yup
    .string()
    .min(2, "Name should be of minimum 2 characters")
    .required("Name is required"),
  role: yup
    .string()
    .min(2, "Role should be of minimum 2 characters")
    .required("Role is required"),
  telefono: yup.number().min(9, "Number must be correct length"),
});

export { userValidationSchema };
