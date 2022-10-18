import * as yup from "yup";

const textValidationSchema = yup.object({
  type: yup.string().required("Type is required"),
  title: yup
    .string()
    .min(2, "Title should be of minimum 2 characters length")
    .required("Title is required"),
  description: yup
    .string()
    .min(2, "Description should be of minimum 2 characters")
    .required("Description is required"),
});

export { textValidationSchema };
