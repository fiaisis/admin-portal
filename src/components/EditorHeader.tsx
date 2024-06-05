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
      {/* empty Box for padding (evenly space title and button */}
      <Box></Box>
      <h1> Title</h1>
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
