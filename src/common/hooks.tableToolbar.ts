import { useState } from "react";

const useTableToolbarController = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => setAnchorEl(null);

  const handleHistoryAction = (): void => {
    alert("viewing text history");
  };

  return {
    anchorEl,
    handleClick,
    handleClose,
    handleHistoryAction,
    open,
  };
};

export { useTableToolbarController };
