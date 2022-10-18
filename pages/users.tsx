import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "../src/Link";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";
import UsersTable from "../src/features/users/UsersTable";
import { userApi } from "../src/features/users/usersApi";

import CircularProgress from "@mui/material/CircularProgress";
import { useAppDispatch } from "../src/common/hooks";
import { listFetched } from "../src/features/users/usersSlice";
import UserDialog from "../src/features/users/UsersDialog";
import { useDialog } from "../src/contexts/dialog.context";
import MessageAlertNotification from "../src/common/components/MessageAlertNotification";

const Users: NextPage = () => {
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = userApi.useGetAllQuery();
  const [deleteUsers] = userApi.useDeleteUsersMutation();

  const { statusMessage, statusType, handleStatusMessage, handleStatusType } =
    useDialog();

  React.useEffect(() => {
    if (data?.users) {
      dispatch(listFetched(data.users));
    }
  }, [data]);

  if (error) {
    handleStatusMessage(JSON.stringify(error, null, 1));
    handleStatusType("error");
  }

  const handleDeleteUser = React.useCallback(
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
    [deleteUsers]
  );

  return (
    <Container maxWidth="lg">
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

        <div style={{ height: "70vh" }}>
          <UserDialog />
          {statusMessage && (
            <MessageAlertNotification
              message={statusMessage}
              severity={statusType}
            />
          )}
          {data?.users && (
            <UsersTable
              users={data?.users}
              handleDeleteUser={handleDeleteUser}
            />
          )}

          {isLoading && <CircularProgress />}
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
