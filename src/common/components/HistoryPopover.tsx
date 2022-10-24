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

    console.log(user?.history);

    setCurrentHistoryDaya(user?.history);
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
          {currentHistoryData?.map((el) => (
            //   <Typography key={el._id} sx={{ p: 2 }}>
            //     {JSON.stringify(el)}
            //   </Typography>
            <>
              <ListItem
                button
                disableTouchRipple
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <ListItemText
                  primary="Modificado por"
                  secondary={el.modificadoPor}
                />
                <ListItemText primary="Fecha" secondary={el.date} />
                <ListItemText primary="Action" secondary={el.action} />
              </ListItem>
              <Divider />
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
