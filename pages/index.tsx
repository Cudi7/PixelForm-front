import type { NextPage } from "next";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../src/Link";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";
import { userApi } from "../src/features/users/usersApi";
import { textApi } from "../src/features/texts/textsApi";

const Home: NextPage = () => {
  userApi.useGetAllQuery();
  textApi.useGetAllQuery();

  return (
    <Container maxWidth="lg" role="container">
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
          MUI v5 + Next.js with TypeScript
        </Typography>

        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default Home;
