import * as React from "react";
import Box from "@mui/material/Box";
import Alert, { AlertColor } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import AlertTitle from "@mui/material/AlertTitle";
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

  return severity && message ? (
    <Box
      sx={{
        width: "100vw",
        maxWidth: 800,
      }}
    >
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
          <AlertTitle>{severity.toUpperCase()}</AlertTitle>
          {severity === "error" ? <pre>{message}</pre> : message}
        </Alert>
      </Collapse>
    </Box>
  ) : null;
}
