import { useCallback, useEffect } from "react";
import type { NextPage } from "next";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "../src/Link";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";
import CircularProgress from "@mui/material/CircularProgress";

import UsersTable from "../src/features/users/UsersTable";
import { userApi } from "../src/features/users/usersApi";
import UserDialog from "../src/features/users/UsersDialog";
import { listFetched } from "../src/features/users/usersSlice";

import { useAppDispatch } from "../src/common/hooks.redux";
import { useDialog } from "../src/contexts/dialog.context";
import MessageAlertNotification from "../src/common/components/MessageAlertNotification";
import { SearchProvider } from "../src/contexts/search.context";

const Users: NextPage = () => {
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = userApi.useGetAllQuery();
  const [deleteUsers] = userApi.useDeleteUsersMutation();

  const { statusMessage, statusType, handleStatusMessage, handleStatusType } =
    useDialog();

  useEffect(() => {
    if (data?.success && data?.users) {
      dispatch(listFetched(data.users));
    }
  }, [data, dispatch]);

  if (error) {
    handleStatusMessage(JSON.stringify(error, null, 1));
    handleStatusType("error");
  }

  const handleDeleteUser = useCallback(
    (idArray: string[]) => {
      deleteUsers(idArray)
        .unwrap()
        .then(() => {
          handleStatusMessage("Usuario/s eliminado/s correctamente");
          handleStatusType("info");
        })
        .catch((error) => {
          handleStatusMessage(JSON.stringify(error, null, 1));
          handleStatusType("error");
        });
    },
    [deleteUsers, handleStatusMessage, handleStatusType]
  );

  return (
    <Container sx={{ width: "100%" }}>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Users Page
        </Typography>

        <div style={{ maxWidth: 800 }}>
          <UserDialog />
          {statusMessage ? (
            <MessageAlertNotification
              message={statusMessage}
              severity={statusType}
            />
          ) : null}
          {data?.users ? (
            <SearchProvider>
              <UsersTable
                users={data?.users}
                handleDeleteUser={handleDeleteUser}
              />
            </SearchProvider>
          ) : null}

          {isLoading ? <CircularProgress sx={{ margin: 20 }} /> : null}
        </div>
        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/">
            Go to the home page
          </Button>
        </Box>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default Users;
