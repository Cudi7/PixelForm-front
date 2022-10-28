import { useEffect, useState, useCallback } from "react";
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
  const [open, setOpen] = useState(false);

  const { statusMessage, statusType, handleStatusMessage, handleStatusType } =
    useDialog();

  const handleClose = useCallback(() => {
    setOpen(false);
    handleStatusMessage("");
    handleStatusType(undefined);
  }, [handleStatusMessage, handleStatusType]);

  useEffect(() => {
    if (statusMessage.length && statusType?.length) {
      setOpen(true);

      if (open) {
        setTimeout(() => {
          handleClose();
        }, 10000);
      }
    }
  }, [statusMessage, statusType, open, handleClose]);

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
