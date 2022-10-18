import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { Text } from "../../common/interfaces/text.interface";
import { useDialog } from "../../contexts/dialog.context";
import { textValidationSchema } from "./textValidationSchema";
import { textApi } from "./textsApi";

export default function TextDialog() {
  const [loadingAction, setLoadingAction] = React.useState(false);

  const {
    selectedInput,
    isOpen,
    handleClickOpen,
    handleClose,
    handleStatusMessage,
    handleStatusType,
  } = useDialog();

  const [addText] = textApi.useAddTextMutation();
  const [updateText] = textApi.useUpdateTextMutation();

  const formik = useFormik({
    initialValues: {
      type: selectedInput?.type || "email",
      title: selectedInput?.title || "",
      description: selectedInput?.description || "",
      _id: selectedInput?._id,
    },
    validationSchema: textValidationSchema,
    onSubmit: (values) => {
      setLoadingAction(true);
      selectedInput ? handleUpdateText(values) : handleNewText(values);
    },
    enableReinitialize: true,
  });

  const handleNewText = React.useCallback(
    (newText: Text) => {
      addText(newText)
        .unwrap()
        .then((payload) => {
          handleStatusMessage("Texto añadido correctamente");
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
    [addText]
  );

  const handleUpdateText = React.useCallback(
    (text: Text) => {
      updateText(text)
        .unwrap()
        .then(() => {
          setLoadingAction(false);
          handleStatusMessage("Texto actualizado correctamente");
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
    [updateText]
  );

  // const textTextMockApi = async () => {
  //   const text = await fetch("https://www.boredapi.com/api/activity");
  //   const textData = await text.json();

  //   const newText: Text = {
  //     type: textData.type,
  //     title: `${textData.activity.split(" ")[0]} ${
  //       textData.activity.split(" ")[1]
  //     } ${textData.activity.split(" ")[2]}`,
  //     description: `${textData.activity}, ${textData.activity
  //       .split("")
  //       .reverse()
  //       .join("")} `,
  //   };

  //   handleNewText(newText);
  // };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ mb: 1 }}>
        {/* <Button variant="outlined" onClick={textTextMockApi} sx={{ mb: 1 }}> */}
        New Text
      </Button>
      <Dialog open={isOpen} onClose={handleClose}>
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
