import ButtonAlert from "./ButtonAlert";
import { Box } from "@mui/material";

export default function EditorHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          textAlign: "center",
        }}
      >
        <h1> Title</h1>
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <ButtonAlert />
      </Box>
    </Box>
  );
}
