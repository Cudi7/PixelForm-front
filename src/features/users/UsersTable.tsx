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

import { User } from "../../common/interfaces/user.interface";
import { getComparator, Order } from "../../common/tableHelpers";
import { Chip } from "@mui/material";
import { useSearch } from "../../contexts/search.context";
import { applyUserSortFilter } from "../../common/tableHelpers";
import SearchNotFound from "../../common/components/SearchNotFound";
import EnhancedTableToolbar from "./UsersTableToolbar";
import EnhancedTableHead from "./UsersTableHead";
import { categoryColors, createData } from "./userHelpers";

interface UsersTableProps {
  users: User[];
  handleDeleteUser: (idArray: string[]) => void;
}

export default function UsersTable({
  users,
  handleDeleteUser,
}: UsersTableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof User | "">("");
  const [selected, setSelected] = React.useState<(string | undefined)[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<User[]>([]);
  const [selectedFilter, setSelectedFilter] = React.useState<string>("all");

  const { filterName } = useSearch();

  React.useEffect(() => {
    const arr: User[] = [];

    users.forEach((user: User) => {
      arr.push(
        createData(
          user._id!,
          user.nombre,
          user.email,
          user.role,
          user.password,
          user?.apellido1,
          user?.apellido2,
          user?.telefono
        )
      );
    });
    setRows(arr);
  }, [users]);

  const handleSelectedFilter = (type: string): void => {
    setSelectedFilter(type);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof User
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);

    if (event.target.checked) {
      const newSelected = filteredUsers.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);

    let newSelected: (string | undefined)[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const filteredUsers = React.useMemo(() => {
    return rows ? applyUserSortFilter(rows, filterName, selectedFilter) : [];
  }, [filterName, rows, selectedFilter]);

  const isUserNotFound = filteredUsers?.length === 0;

  return (
    <Box sx={{ width: "100%" }} role="table">
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDeleteUser={handleDeleteUser}
          selected={selected!}
          setSelected={setSelected}
          handleSelectedFilter={handleSelectedFilter}
          selectedFilter={selectedFilter}
          setOrderBy={setOrderBy}
          handleChangePage={handleChangePage}
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
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredUsers.length}
            />
            <TableBody>
              {filteredUsers
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id!);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id!)}
                      role="checkbox"
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
                        {`${row.nombre} ${row?.apellido1 || ""} ${
                          row?.apellido2 || ""
                        }`}
                      </TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={row.role}
                          color={categoryColors(row.role)}
                        />
                      </TableCell>
                      <TableCell align="right">{row.telefono}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
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
                    <SearchNotFound
                      searchQuery={filterName}
                      selectedFilter={selectedFilter}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
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
