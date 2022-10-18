// import * as React from "react";
// import Alert, { AlertColor } from "@mui/material/Alert";
// import Stack from "@mui/material/Stack";

// export default function MessageAlertNotification({
//   severity,
//   message,
// }: MessageAlertNotificationProps) {
//   console.log(message);

//   return (
//     <Stack sx={{ width: "100%", my: 5 }} spacing={2}>
//       {/* <Alert severity="error">This is an error alert — check it out!</Alert>
//       <Alert severity="warning">This is a warning alert — check it out!</Alert>
//       <Alert severity="info">This is an info alert — check it out!</Alert>
//       <Alert severity="success">This is a success alert — check it out!</Alert> */}
//       <Alert severity={severity}></Alert>
//     </Stack>
//   );
// }

import * as React from "react";
import Box from "@mui/material/Box";
import Alert, { AlertColor } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useDialog } from "../../contexts/dialog.context";

interface MessageAlertNotificationProps {
  severity: AlertColor | undefined;
  message: string;
}

export default function MessageAlertNotification({
  severity,
  message,
}: MessageAlertNotificationProps) {
  const [open, setOpen] = React.useState(false);
  let intervalId: ReturnType<typeof setTimeout>;

  const { statusMessage, statusType, handleStatusMessage, handleStatusType } =
    useDialog();

  React.useEffect(() => {
    if (statusMessage.length && statusType.length) {
      setOpen(true);
      if (open) {
        intervalId = setTimeout(() => {
          handleClose();
        }, 10000);
      }
    }
  }, [statusMessage, statusType, open]);

  const handleClose = () => {
    clearTimeout(intervalId);
    setOpen(false);
    handleStatusMessage("");
    handleStatusType("");
  };

  return (
    <Box sx={{ maxWidth: 750 }}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}
