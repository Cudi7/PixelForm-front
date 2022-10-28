import PropTypes from "prop-types";
// material
import { Paper, Typography } from "@mui/material";

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = "", ...other }) {
  const { selectedFilter } = other;
  return (
    <Paper elevation={0} {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong> (filtering by{" "}
        <strong>{selectedFilter}</strong>). Try checking for typos or using
        complete words.
      </Typography>
    </Paper>
  );
}
