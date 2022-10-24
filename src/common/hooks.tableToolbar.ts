import { useState } from "react";
import { selectUsers } from "../features/users/usersSlice";
import { useAppSelector } from "./hooks.redux";
import { User } from "./interfaces/user.interface";

const useTableToolbarController = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => setAnchorEl(null);

  return {
    anchorEl,
    handleClick,
    handleClose,
    open,
  };
};

export { useTableToolbarController };
