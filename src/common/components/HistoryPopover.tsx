import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import HistoryIcon from "@mui/icons-material/History";
import { useAppSelector } from "../hooks.redux";
import { selectUsers } from "../../features/users/usersSlice";
import { User } from "../interfaces/user.interface";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SendIcon from "@mui/icons-material/Send";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

const style = {
  width: "100%",
  minWidth: 400,
  //   maxWidth: 360,
  bgcolor: "background.paper",
  maxHeight: 500,
};

export default function BasicPopover({
  selected,
}: {
  selected: (string | undefined)[];
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [currentHistoryData, setCurrentHistoryDaya] = React.useState<
    [{ modificadoPor: string; date: Date; action: string }] | undefined
  >(undefined);

  const users = useAppSelector(selectUsers);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleHistoryAction(selected);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleHistoryAction = (selected: (string | undefined)[]) => {
    const user = users?.find((el: User) => el._id === selected[0]);

    const sortedArray = [...user?.history];

    setCurrentHistoryDaya(sortedArray?.reverse());
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Tooltip title="History">
        <IconButton onClick={handleClick}>
          <HistoryIcon />
        </IconButton>
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List sx={style} component="nav" aria-label="mailbox folders">
          {currentHistoryData?.map((el, index) => (
            <>
              {index === 0 && (
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  sx={{
                    textAlign: "center",
                    backgroundColor: "rgba(144, 238, 144, 0.1)",
                  }}
                >
                  Last modification
                </Typography>
              )}
              {index === 1 && (
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  sx={{
                    textAlign: "center",
                    backgroundColor: "rgba(255, 0, 0, 0.1)",
                  }}
                >
                  Older modifications
                </Typography>
              )}

              <ListItem
                button
                disableTouchRipple
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <span
                  style={{ display: "flex", gap: 20, alignItems: "center" }}
                >
                  <PersonIcon />
                  <ListItemText
                    primary="Modificado por"
                    secondary={el.modificadoPor}
                  />
                </span>
                <span
                  style={{ display: "flex", gap: 20, alignItems: "center" }}
                >
                  <CalendarMonthIcon />
                  <ListItemText primary="Fecha" secondary={el.date} />
                </span>
                <span
                  style={{ display: "flex", gap: 20, alignItems: "center" }}
                >
                  <AccountTreeIcon />
                  <ListItemText primary="Action" secondary={el.action} />
                </span>
              </ListItem>
              {index !== 0 && <Divider />}
            </>
          ))}
        </List>
        {/* {currentHistoryData?.map((el) => {
            <p>{el}</p>;
          })} */}
      </Popover>
    </div>
  );
}
