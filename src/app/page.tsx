"use client";
import { Box } from "@mui/material";

import { Button, Container } from "@mui/material";
const DEFAULT_INSTRUMENT = "MARI";

export default function Home() {
  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "md",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 5,
          justifyContent: "space-between",
          width: "50%",
        }}
      >
        <Button
          variant="contained"
          style={{ width: 300, height: 300 }}
          href={`/specification/${DEFAULT_INSTRUMENT}`}
        >
          Specifications
        </Button>
        <Button
          disabled
          variant="contained"
          style={{ width: 300, height: 300 }}
        >
          fileshare
        </Button>
      </Box>
    </Container>
  );
}
