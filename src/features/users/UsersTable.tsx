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

import { UserHeadCell, User } from "../../common/interfaces/user.interface";
import { getComparator, Order } from "../../common/tableHelpers";
import { Chip } from "@mui/material";
import { useSearch } from "../../contexts/search.context";
import { applyUserSortFilter } from "../../common/tableHelpers";
import SearchNotFound from "../../common/components/SearchNotFound";
import { categoryColors, createData, filterItemsList } from "./userHelpers";
import { useTableController } from "../../common/hooks.table";
import EnhancedTableHead from "../../common/components/TableHead";
import EnhancedTableToolbar from "../../common/components/TableToolbar";

interface UsersTableProps {
  users: User[];
  handleDeleteUser: (idArray: string[]) => void;
}

const headCells: readonly UserHeadCell[] = [
  {
    id: "nombre",
    numeric: false,
    disablePadding: true,
    label: "Nombre",
  },

  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "role",
    numeric: true,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "telefono",
    numeric: true,
    disablePadding: false,
    label: "Phone",
  },
];

export default function UsersTable({
  users,
  handleDeleteUser,
}: UsersTableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof User | "">("");
  const [rows, setRows] = React.useState<User[]>([]);

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

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof User
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

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
              onSelectAllClick={(e) => handleSelectAllClick(e, filteredUsers)}
              onRequestSort={handleRequestSort}
              rowCount={filteredUsers.length}
              headCells={headCells}
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
                      onClick={(event) => handleSelectionClick(event, row._id!)}
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
