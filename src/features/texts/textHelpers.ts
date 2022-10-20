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

const categoryColors = (name: string) => {
  const colors = [
    { name: "recreational", color: "#fefae0" },
    { name: "busywork", color: "#ffc8dd" },
    { name: "charity", color: "#ffb703" },
    { name: "relaxation", color: "#ffb5a7" },
    { name: "education", color: "#adc178" },
    { name: "music", color: "#90b5a7" },
    { name: "social", color: "#98c1d9" },
    { name: "diy", color: "#a9dcf2" },
    { name: "cooking", color: "#f7e1d7" },
  ];

  return colors.filter((el) => el.name === name)[0].color;
};

const filterItemsList = [
  "all",
  "recreational",
  "busywork",
  "charity",
  "relaxation",
  "education",
  "music",
  "social",
  "diy",
  "cooking",
];

export { textValidationSchema, categoryColors, filterItemsList };
