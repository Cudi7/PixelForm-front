import * as yup from "yup";
import { User } from "../../common/interfaces/user.interface";

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

const categoryColors = (role: string): string => {
  const colors = [
    { name: "evaluador", color: "primary" },
    { name: "participante", color: "secondary" },
    { name: "superuser", color: "success" },
    { name: "administrador", color: "warning" },
  ];

  return colors.filter((el) => el.name === role)[0].color;
};

const filterItemsList = [
  "all",
  "superuser",
  "participante",
  "evaluador",
  "administrador",
];

const createData = (
  _id: string,
  nombre: string,
  email: string,
  role: string,
  password: string,
  apellido1?: string,
  apellido2?: string,
  telefono?: string
): User => ({
  _id,
  nombre,
  email,
  role,
  password,
  apellido1,
  apellido2,
  telefono,
});

export { userValidationSchema, categoryColors, filterItemsList, createData };
