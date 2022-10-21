import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { TextHeadCell, Text } from "../../common/interfaces/text.interface";
import {
  applyTextSortFilter,
  getComparator,
  Order,
} from "../../common/tableHelpers";
import { useSearch } from "../../contexts/search.context";
import SearchNotFound from "../../common/components/SearchNotFound";
import { Chip } from "@mui/material";
import { categoryColors, createData, filterItemsList } from "./textHelpers";
import { useTableController } from "../../common/hooks.table";
import EnhancedTableHead from "../../common/components/TableHead";
import EnhancedTableToolbar from "../../common/components/TableToolbar";

interface TextsTableProps {
  texts: Text[];
  handleDeleteText: (idArray: string[]) => void;
}

const headCells: readonly TextHeadCell[] = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Title",
  },

  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
];

export default function TextsTable({
  texts,
  handleDeleteText,
}: TextsTableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Text | "">("");
  const [rows, setRows] = React.useState<Text[]>([]);

  const { filterName } = useSearch();
  const {
    selected,
    setSelected,
    handleSelectionClick,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPage,
    dense,
    handleChangeDense,
    emptyRows,
    handleSelectedFilter,
    selectedFilter,
    handleSelectAllClick,
  } = useTableController();

  React.useEffect(() => {
    const arr: Text[] = [];

    texts.forEach((text: Text) => {
      arr.push(createData(text._id!, text.title, text.description, text.type));
    });
    setRows(arr);
  }, [texts]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Text
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const filteredTexts = React.useMemo(() => {
    return rows ? applyTextSortFilter(rows, filterName, selectedFilter) : [];
  }, [filterName, rows, selectedFilter]);

  const isUserNotFound = filteredTexts?.length === 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDeleteText={handleDeleteText}
          selected={selected!}
          setSelected={setSelected}
          handleSelectedFilter={handleSelectedFilter}
          selectedFilter={selectedFilter}
          setOrderBy={setOrderBy}
          handleChangePage={handleChangePage}
          filterItemsList={filterItemsList}
        />
        <TableContainer sx={{ maxHeight: "60vh" }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={(e) => handleSelectAllClick(e, filteredTexts)}
              onRequestSort={handleRequestSort}
              rowCount={filteredTexts.length}
              headCells={headCells}
            />
            <TableBody>
              {filteredTexts
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id!);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleSelectionClick(event, row._id!)}
                      type="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.title}
                      </TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={row.type}
                          sx={{
                            backgroundColor: categoryColors(row.type),
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows(rows) > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows(rows),
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredTexts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
