import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { User } from "../../common/interfaces/user.interface";
import { useDialog } from "../../contexts/dialog.context";
import { userApi } from "./usersApi";
import { userValidationSchema } from "./userHelpers";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../common/hooks.redux";
import {
  historyActionRecorded,
  recordHistoryAction,
  selectUsers,
} from "./usersSlice";
import { date } from "yup";

export default function UserDialog() {
  const [loadingAction, setLoadingAction] = React.useState(false);

  const dispatch = useAppDispatch();
  const currentUserLoggedIn = "Mariana Ríos";

  const [addUser] = userApi.useAddUserMutation();
  const [updateUser] = userApi.useUpdateUserMutation();
  const users: User[] = useAppSelector(selectUsers);

  const {
    selectedInput,
    isOpen,
    handleClickOpen,
    handleClose,
    handleStatusMessage,
    handleStatusType,
  } = useDialog();

  const formik = useFormik({
    initialValues: {
      email: selectedInput?.email || "",
      password: selectedInput?.password || "",
      nombre: selectedInput?.nombre || "",
      apellido1: selectedInput?.apellido1 || "",
      apellido2: selectedInput?.apellido2 || "",
      telefono: selectedInput?.telefono || "",
      role: selectedInput?.role || "participante",
      _id: selectedInput?._id,
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      setLoadingAction(true);
      selectedInput ? handleUpdateUser(values) : handleNewUser(values);
    },
    enableReinitialize: true,
  });

  const handleNewUser = React.useCallback(
    (newUser: User) => {
      addUser(newUser)
        .unwrap()
        .then((payload) => {
          handleStatusMessage("Usuario añadido correctamente");
          handleStatusType("success");
          formik.resetForm();
        })
        .catch((error) => {
          handleStatusMessage(JSON.stringify(error, null, 1));
          handleStatusType("error");
        })
        .finally(() => {
          setLoadingAction(false);
          handleClose();
        });
    },
    [addUser]
  );

  const handleUpdateUser = React.useCallback(
    (user: User) => {
      updateUser({
        ...user,
        history: {
          modificadoPor: currentUserLoggedIn,
          action: "User data updated yey!!",
        },
      })
        .unwrap()
        .then(() => {
          setLoadingAction(false);
          handleStatusMessage("Usuario actualizado correctamente");
          handleStatusType("info");
          formik.resetForm();
        })
        .catch((error) => {
          handleStatusMessage(JSON.stringify(error, null, 1));
          handleStatusType("error");
        })
        .finally(() => {
          setLoadingAction(false);
          handleClose();
        });
    },
    [updateUser]
  );

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ mb: 1 }}>
        New User
      </Button>
      <Dialog open={isOpen} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>New User</DialogTitle>
          <DialogContent>
            <Divider sx={{ my: 1 }}>
              <Typography variant="caption" color="primary">
                Información principal
              </Typography>
            </Divider>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                id="nombre"
                name="nombre"
                label="Nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
                sx={{ width: "49%" }}
              />
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ width: "49%" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                sx={{ width: "49%" }}
              />
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                id="role"
                name="role"
                label="Role"
                value={formik.values.role}
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={
                  formik.touched.role
                    ? formik.errors.role
                    : "not modifiable, testing purposes only"
                }
                sx={{ width: "49%" }}
                disabled
              />
            </div>
            <Divider sx={{ mt: 5 }}>
              <Typography variant="caption" color="primary">
                Información secundaria
              </Typography>
            </Divider>

            <TextField
              fullWidth
              margin="dense"
              variant="outlined"
              id="apellido1"
              name="apellido1"
              label="First Name"
              value={formik.values.apellido1}
              onChange={formik.handleChange}
              error={
                formik.touched.apellido1 && Boolean(formik.errors.apellido1)
              }
              helperText={formik.touched.apellido1 && formik.errors.apellido1}
            />
            <TextField
              fullWidth
              margin="dense"
              variant="outlined"
              id="apellido2"
              name="apellido2"
              label="Last Name"
              value={formik.values.apellido2}
              onChange={formik.handleChange}
              error={
                formik.touched.apellido2 && Boolean(formik.errors.apellido2)
              }
              helperText={formik.touched.apellido2 && formik.errors.apellido2}
            />
            <TextField
              fullWidth
              margin="dense"
              variant="outlined"
              id="telefono"
              name="telefono"
              label="Phone"
              value={formik.values.telefono}
              onChange={formik.handleChange}
              error={formik.touched.telefono && Boolean(formik.errors.telefono)}
              helperText={formik.touched.telefono && formik.errors.telefono}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={loadingAction}>
              Cancel
            </Button>

            <LoadingButton
              color="primary"
              variant="contained"
              type="submit"
              loading={loadingAction}
            >
              Submit
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
