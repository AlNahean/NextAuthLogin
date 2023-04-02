import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { Stack } from "@mui/material";
import { Image } from "@mui/icons-material";
import Head from "next/head";

export default function Index() {
  const router = useRouter();
  let { data, status } = useSession();

  console.log(data);

  if (status === "unauthenticated") {
    router.push("/signin");
  }

  // console.log(data, status);
  return (
    <>
      <Head>
        <title>Authentication App</title>
      </Head>

      <Container maxWidth="lg">
        <Box className=" index-page-container">
          <Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{ marginY: " 20px" }}
            >
              {data && (
                <img
                  src={data.user.image}
                  style={{
                    height: "12rem",
                    width: "12rem",
                    borderRadius: "12rem",
                  }}
                />
              )}
            </Stack>
            <Typography variant="h4" align="center">
              {data && data.user.name}
            </Typography>
            <Typography variant="h4" align="center">
              {data && data.user.email}
            </Typography>
            <Typography variant="h4" align="center">
              {data && data.user.expires}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ marginY: " 20px" }}
          >
            <Button
              // align="center"
              size="large"
              color="error"
              variant="contained"
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
