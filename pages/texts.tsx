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
import { useDialog } from "../src/contexts/dialog.context";
import dynamic from "next/dynamic";

const MessageAlertNotification = dynamic(
  () => import("../src/common/components/MessageAlertNotification"),
  {
    loading: () => <div>Loading...</div>,
  }
);

const Texts: NextPage = () => {
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = textApi.useGetAllQuery();
  const [deleteTexts] = textApi.useDeleteTextsMutation();

  const { statusMessage, statusType, handleStatusMessage, handleStatusType } =
    useDialog();

  React.useEffect(() => {
    if (data?.texts) {
      dispatch(listFetched(data.texts));
    }
  }, [data]);

  if (error) {
    handleStatusMessage(JSON.stringify(error, null, 1));
    handleStatusType("error");
  }

  const handleDeleteText = React.useCallback(
    (idArray: string[]) => {
      deleteTexts(idArray)
        .unwrap()
        .then(() => {
          handleStatusMessage("Texto/s eliminado/s correctamente");
          handleStatusType("info");
        })
        .catch((error) => {
          handleStatusMessage(JSON.stringify(error, null, 1));
          handleStatusType("error");
        });
    },
    [deleteTexts]
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
          Texts Page
        </Typography>
        <div style={{ maxWidth: 800 }}>
          <TextDialog />

          <MessageAlertNotification
            message={statusMessage}
            severity={statusType}
          />

          {data?.texts && (
            <TextsTable
              texts={data?.texts}
              handleDeleteText={handleDeleteText}
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

export default Texts;
