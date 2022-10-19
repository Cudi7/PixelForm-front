import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "../../contexts/search.context";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";

const SearchElement = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgba(0,0,0,0.02)",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Search() {
  const { handleFilterByName, filterName, clearFilterName } = useSearch();

  return (
    <SearchElement>
      {filterName && (
        <IconButton
          aria-label="clear search button"
          component="label"
          onClick={clearFilterName}
          sx={{ position: "absolute", right: 0, zIndex: 1 }}
        >
          <ClearIcon />
        </IconButton>
      )}
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      <StyledInputBase
        value={filterName}
        onChange={handleFilterByName}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </SearchElement>
  );
}
