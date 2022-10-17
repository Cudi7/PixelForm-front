import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { useFormik } from "formik";
import { Text } from "../../common/interfaces/text.interface";

export default function TextDialog({
  handleDialogState,
  handleNewText,
  handleUpdateText,
  isEditing,
}: {
  handleDialogState: () => void;
  handleNewText: (newText: Text) => void;
  handleUpdateText: (newText: Text) => void;
  isEditing: Text | boolean;
}) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    handleDialogState();
    setOpen(false);
  };

  const validationSchema = yup.object({
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

  const formik = isEditing
    ? useFormik({
        initialValues: {
          type: isEditing.type,
          title: isEditing.title,
          description: isEditing.description,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          handleUpdateText(values);
          handleClose();
        },
      })
    : useFormik({
        initialValues: {
          type: "email",
          title: "",
          description: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          handleNewText(values);
          handleClose();
        },
      });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              fullWidth
              margin="dense"
              variant="standard"
              id="type"
              name="type"
              label="Type"
              value={formik.values.type}
              onChange={formik.handleChange}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
            />
            <TextField
              fullWidth
              margin="dense"
              variant="standard"
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />

            <TextField
              fullWidth
              margin="dense"
              variant="standard"
              id="description"
              name="description"
              label="Description"
              type="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
