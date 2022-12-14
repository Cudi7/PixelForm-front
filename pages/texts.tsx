import { useEffect, useCallback } from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "../src/Link";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";

import CircularProgress from "@mui/material/CircularProgress";
import { useAppDispatch } from "../src/common/hooks.redux";
import { listFetched } from "../src/features/texts/textsSlice";
import { textApi } from "../src/features/texts/textsApi";
import TextsTable from "../src/features/texts/TextsTable";
import TextDialog from "../src/features/texts/TextsDialog";
import { useDialog } from "../src/contexts/dialog.context";
import dynamic from "next/dynamic";
import { SearchProvider } from "../src/contexts/search.context";

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

  useEffect(() => {
    if (data?.texts) {
      dispatch(listFetched(data.texts));
    }
  }, [data, dispatch]);

  if (error) {
    handleStatusMessage(JSON.stringify(error, null, 1));
    handleStatusType("error");
  }

  const handleDeleteText = useCallback(
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
    [deleteTexts, handleStatusMessage, handleStatusType]
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

          {data?.texts ? (
            <SearchProvider>
              <TextsTable
                texts={data?.texts}
                handleDeleteText={handleDeleteText}
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

export default Texts;
