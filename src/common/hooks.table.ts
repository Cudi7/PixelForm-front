import { useState } from "react";
import { Text } from "./interfaces/text.interface";
import { User } from "./interfaces/user.interface";

const useTableController = () => {
  const [selected, setSelected] = useState<(string | undefined)[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const handleSelectionClick = (
    event: React.MouseEvent<unknown>,
    name: string
  ) => {
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

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    filteredData: (string | undefined | Text | User)[]
  ) => {
    if (event.target.checked && typeof filteredData !== "string") {
      const newSelected = filteredData.map((n) => n?._id!);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
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

  const emptyRows = (rows: (Text | User)[]): number => {
    // Avoid a layout jump when reaching the last page with empty rows.
    return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  };

  const handleSelectedFilter = (type: string): void => {
    setSelectedFilter(type);
  };

  return {
    selected,
    setSelected,
    handleSelectionClick,
    handleSelectAllClick,
    handleChangePage,
    page,
    handleChangeRowsPerPage,
    rowsPerPage,
    dense,
    handleChangeDense,
    emptyRows,
    handleSelectedFilter,
    selectedFilter,
  };
};

export { useTableController };
