import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "../src/Link";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";

import CircularProgress from "@mui/material/CircularProgress";
import { useAppDispatch } from "../src/common/hooks";
import { listFetched } from "../src/features/texts/textsSlice";
import { textApi } from "../src/features/texts/textsApi";
import TextsTable from "../src/features/texts/TextsTable";
import TextDialog from "../src/features/texts/TextsDialog";

const Texts: NextPage = () => {
  const dispatch = useAppDispatch();
  const [showNewTextDialog, setShowNewTextDialog] = React.useState(false);
  const [showEditTextDialog, setShowEditTextDialog] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState<Text | boolean>(false);

  const { data, error, isLoading } = textApi.useGetAllQuery();
  const [addText] = textApi.useAddTextMutation();
  //   const [deleteUsers] = userApi.useDeleteUsersMutation();
  //   const [updateUser] = userApi.useUpdateUserMutation();

  React.useEffect(() => {
    if (data?.texts) {
      dispatch(listFetched(data.texts));
    }
  }, [data]);

  const handleDialogState = () => {
    setShowNewTextDialog(false);
    setShowEditTextDialog(false);
    setIsEditing(false);
  };

  const handleUpdateDialogState = (idArray: string[]) => {
    const editedText = data?.texts!.find((el: Text) => el._id === idArray[0]);
    setIsEditing(editedText!);
    setShowEditTextDialog(true);
  };

  const handleNewText = React.useCallback(
    (newText: Text) => {
      addText(newText)
        .unwrap()
        .then((payload) => {
          console.log("texto añadido correctamente");
        })
        .catch((error) => {
          console.error(error.data.error);
          console.log("ha habido un error");
        });
    },
    [addText]
  );

  const handleDeleteText = React.useCallback(
    (idArray: string[]) => {
      // deleteUsers(idArray)
      //   .unwrap()
      //   .then(() => {
      //     console.log("usuario/s eliminado/s correctamente");
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     console.log("ha habido un error");
      //   });
    },
    // [deleteUsers]
    []
  );

  const handleUpdateText = React.useCallback(
    (text: Text) => {
      // updateText(text)
      //   .unwrap()
      //   .then(() => {
      //     console.log("texto actualizado correctamente");
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     console.log("ha habido un error");
      //   });
    },
    // [updateText]
    []
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
          Texts Page
        </Typography>
        <div style={{ height: "70vh" }}>
          {data?.texts && (
            <TextsTable
              texts={data?.texts}
              handleDeleteText={handleDeleteText}
              handleUpdateDialogState={handleUpdateDialogState}
            />
          )}
          {error && <p>{error.data.error}</p>}
          {isLoading && <CircularProgress />}
          {showNewTextDialog && (
            <TextDialog
              handleDialogState={handleDialogState}
              handleNewText={handleNewText}
              handleUpdateText={handleUpdateText}
              isEditing={false}
            />
          )}
          {/* {showEditTextDialog && (
            <TextDialog
              handleDialogState={handleDialogState}
              handleNewText={handleNewText}
              handleUpdateText={handleUpdateText}
              isEditing={isEditing}
            />
          )} */}
        </div>
        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/">
            Go to the home page
          </Button>
          <Button
            variant="contained"
            onClick={() => setShowNewTextDialog((prev) => !prev)}
          >
            Create hardcoded text
          </Button>
        </Box>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default Texts;
