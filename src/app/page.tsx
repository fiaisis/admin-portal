"use client";
import InstrumentList from "@/components/InstrumentList";
import TextEditor from "@/components/TextEditor";
import { Box, Divider } from "@mui/material";
import { useState } from "react";
import EditorHeader from "@/components/EditorHeader";

export default function SpecificationEditor() {
  const [instrument, setInstrument] = useState<string>("ALF");

  return (
    <>
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
          <InstrumentList
            selected={instrument}
            handleInstrumentChange={setInstrument}
          />
        </Box>
        <Box sx={{ flex: 7 }}>
          <EditorHeader></EditorHeader>
          <Divider
            sx={{
              height: 10,
              borderTopWidth: 2,
            }}
          ></Divider>
          <TextEditor />
        </Box>
      </Box>
    </>
  );
}
