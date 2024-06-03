import InstrumentList from "@/components/InstrumentList";
import TextEditor from "@/components/TextEditor";
import { Box } from "@mui/material";

export default function specificationEditor() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        objectFit: "contains",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <InstrumentList />
      </Box>
      <Box style={{ flex: 4 }}>
        <TextEditor />
      </Box>
    </Box>
  );
}
