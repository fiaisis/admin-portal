import InstrumentList from "@/components/InstrumentList";
import TextEditor from "@/components/TextEditor";
import { Box } from "@mui/material";
import { Fragment } from "react";
import EditorHeader from "@/components/EditorHeader";

export default function specificationEditor() {
  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          objectFit: "contains",
          height: "75vh",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <InstrumentList />
        </Box>
        <Box sx={{ flex: 7 }}>
          <EditorHeader></EditorHeader>
          <TextEditor />
        </Box>
      </Box>
    </Fragment>
  );
}
