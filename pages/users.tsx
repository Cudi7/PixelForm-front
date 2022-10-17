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
import { User } from "../src/common/interfaces/user.interface";
import { useAppDispatch } from "../src/common/hooks";
import { listFetched } from "../src/features/users/usersSlice";
import UserDialog from "../src/features/users/UsersDialog";

const Users: NextPage = () => {
  const dispatch = useAppDispatch();
  const [showNewUserDialog, setShowNewUserDialog] = React.useState(false);
  const [showEditUserDialog, setShowEditUserDialog] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState<User | boolean>(false);

  const { data, error, isLoading } = userApi.useGetAllQuery();
  const [addUser] = userApi.useAddUserMutation();
  const [deleteUsers] = userApi.useDeleteUsersMutation();
  const [updateUser] = userApi.useUpdateUserMutation();

  React.useEffect(() => {
    if (data?.users) {
      dispatch(listFetched(data.users));
    }
  }, [data]);

  console.log(error);

  const handleDialogState = () => {
    setShowNewUserDialog(false);
    setShowEditUserDialog(false);
    setIsEditing(false);
  };

  const handleUpdateDialogState = (idArray: string[]) => {
    const editedUser = data?.users!.find((el: User) => el._id === idArray[0]);
    setIsEditing(editedUser!);
    setShowEditUserDialog(true);
  };

  const handleNewUser = React.useCallback(
    (newUser: User) => {
      addUser(newUser)
        .unwrap()
        .then((payload) => {
          console.log("usuario añadido correctamente");
        })
        .catch((error) => {
          console.error(error.data.error);
          console.log("ha habido un error");
        });
    },
    [addUser]
  );

  const handleDeleteUser = React.useCallback(
    (idArray: string[]) => {
      deleteUsers(idArray)
        .unwrap()
        .then(() => {
          console.log("usuario/s eliminado/s correctamente");
        })
        .catch((error) => {
          console.error(error);
          console.log("ha habido un error");
        });
    },
    [deleteUsers]
  );

  const handleUpdateUser = React.useCallback(
    (user: User) => {
      updateUser(user)
        .unwrap()
        .then(() => {
          console.log("usuario actualizado correctamente");
        })
        .catch((error) => {
          console.error(error);
          console.log("ha habido un error");
        });
    },
    [updateUser]
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
          {data?.users && (
            <UsersTable
              users={data?.users}
              handleDeleteUser={handleDeleteUser}
              handleUpdateDialogState={handleUpdateDialogState}
            />
          )}
          {error && <p>{error.data.error}</p>}
          {isLoading && <CircularProgress />}
          {showNewUserDialog && (
            <UserDialog
              handleDialogState={handleDialogState}
              handleNewUser={handleNewUser}
              handleUpdateUser={handleUpdateUser}
              isEditing={false}
            />
          )}
          {showEditUserDialog && (
            <UserDialog
              handleDialogState={handleDialogState}
              handleNewUser={handleNewUser}
              handleUpdateUser={handleUpdateUser}
              isEditing={isEditing}
            />
          )}
        </div>
        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/">
            Go to the home page
          </Button>
          <Button
            variant="contained"
            onClick={() => setShowNewUserDialog((prev) => !prev)}
          >
            Create hardcoded user
          </Button>
        </Box>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default Users;
