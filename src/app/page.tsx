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
      <InstrumentList />
      <Box
        sx={{
          display: "flex-grow",
          justifyContent: "right",
          width: "100%",
          maxWidth: 100,
        }}
      >
        <TextEditor />
      </Box>
    </Box>
  );
}

}
