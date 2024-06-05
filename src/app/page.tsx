// attempt at adding button and alert

import InstrumentList from "@/components/InstrumentList";
import TextEditor from "@/components/TextEditor";
import { Box } from "@mui/material";
import { Fragment } from "react";
import EditorHeader from "@/components/EditorHeader";

export default function specificationEditor() {
  return (
    <Fragment>
      <Box
        //  alternative
        // {{
        //   display: "flex",
        //   height: "90vh",
        //   width: "100vw",
        // }}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          objectFit: "contains",
          height: "90vh",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <InstrumentList />
        </Box>
        <Box sx={{ flex: 4 }}>
          <EditorHeader></EditorHeader>
          <TextEditor />
        </Box>
      </Box>
    </Fragment>
  );
}
