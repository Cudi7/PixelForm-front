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
import { User } from "../../common/interfaces/user.interface";

interface UserDialogProps {
  handleDialogState: () => void;
  handleNewUser: (newUser: User) => void;
  handleUpdateUser: (newUser: User) => void;
  isEditing: User | boolean;
}

export default function UserDialog({
  handleDialogState,
  handleNewUser,
  handleUpdateUser,
  isEditing,
}: UserDialogProps) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    handleDialogState();
    setOpen(false);
  };

  const validationSchema = yup.object({
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
  });

  const formik = isEditing
    ? useFormik({
        initialValues: {
          email: isEditing.email,
          password: isEditing.password,
          nombre: isEditing.nombre,
          role: isEditing.role,
          _id: isEditing._id,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          handleUpdateUser(values);
          handleClose();
        },
      })
    : useFormik({
        initialValues: {
          email: "",
          password: "",
          nombre: "",
          role: "participant",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          handleNewUser(values);
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
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="dense"
              variant="standard"
              id="nombre"
              name="nombre"
              label="Nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              helperText={formik.touched.nombre && formik.errors.nombre}
            />

            <TextField
              fullWidth
              margin="dense"
              variant="standard"
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              margin="dense"
              variant="standard"
              id="role"
              name="role"
              label="Role"
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
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
