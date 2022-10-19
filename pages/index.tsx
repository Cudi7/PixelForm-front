import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../src/Link";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";
import { DialogProvider } from "../src/contexts/dialog.context";
import { EXPORT_DETAIL } from "next/dist/shared/lib/constants";

const Home: NextPage = () => {
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
          MUI v5 + Next.js with TypeScript example
        </Typography>
        <Link href="/users" color="secondary">
          Go to the users page
        </Link>

        <Link href="/texts" color="secondary">
          Go to the texts page
        </Link>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default Home;
