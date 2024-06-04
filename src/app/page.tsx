// attempt at adding button and alert

import InstrumentList from "@/components/InstrumentList";
import TextEditor from "@/components/TextEditor";
import { Box, Button } from "@mui/material";
import { Fragment } from "react";
import Alert from "@mui/material/Alert";
import ButtonAlert from "@/components/ButtonAlert";

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
          <TextEditor />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          // flexDirection: "row",
          // objectFit: "contains",
          // height: "90vh",
        }}
      >
        <ButtonAlert />
      </Box>
    </Fragment>
  );
}
