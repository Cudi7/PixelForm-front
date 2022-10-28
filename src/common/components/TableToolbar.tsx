import * as React from "react";
import { alpha } from "@mui/material/styles";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";

import { useDialog } from "../../contexts/dialog.context";
import Search from "./Search";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useSearch } from "../../contexts/search.context";
import { useTableToolbarController } from "../hooks.tableToolbar";
import { Text } from "../interfaces/text.interface";
import { User } from "../interfaces/user.interface";

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleDeleteUser: (idArray: (string | undefined)[]) => void;
  selected: (string | undefined)[];
  setSelected: () => void;
  handleSelectedFilter: (type: string) => void;
  selectedFilter: string;
  setOrderBy: React.Dispatch<
    React.SetStateAction<"" | keyof Text | keyof User>
  >;
  handleChangePage: (event: unknown, newPage: number) => void;
  filterItemsList: string[];
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { handleUpdateInput } = useDialog();
  const { clearFilterName } = useSearch();
  const { anchorEl, handleClick, handleClose, open } =
    useTableToolbarController();

  const {
    numSelected,
    handleDeleteUser,
    selected,
    setSelected,
    handleSelectedFilter,
    selectedFilter,
    setOrderBy,
    handleChangePage,
    filterItemsList,
  } = props;

  const handleSelection = (type: string): void => {
    handleChangePage(null, 0);
    handleClose();
    handleSelectedFilter(type);
  };

  const handleDeleteAction = () => {
    handleDeleteUser(selected);
    setSelected([]);
  };

  const handleUpdateAction = () => {
    handleUpdateInput(selected);
    setSelected([]);
  };

  const handleClearAll = () => {
    handleSelection("all");
    clearFilterName();
    setOrderBy("");
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Text Table
        </Typography>
      )}
      {numSelected === 1 ? (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={handleUpdateAction}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteAction}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : numSelected > 1 ? (
        <Tooltip title="Delete all">
          <IconButton onClick={handleDeleteAction}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Search />
          <Tooltip title="Filter Role">
            <Badge
              color="warning"
              variant={selectedFilter === "all" ? "" : "dot"}
            >
              <IconButton
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <FilterListIcon />
              </IconButton>
            </Badge>
          </Tooltip>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {filterItemsList.map((el) => (
              <MenuItem
                key={el}
                onClick={() => handleSelection(el)}
                disabled={el === selectedFilter}
                selected={el === selectedFilter}
              >
                {`${el.slice(0, 1).toUpperCase()}${el.slice(1)}`}
              </MenuItem>
            ))}
          </Menu>
          <Tooltip title="Clear Filters">
            <IconButton onClick={handleClearAll}>
              <HighlightOffIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
