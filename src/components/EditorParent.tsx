"use client";

import { Divider } from "@mui/material";
import EditorHeader from "@/components/EditorHeader";
import TextEditor from "@/components/TextEditor";
import { useState } from "react";

interface EditorParentProps {
  instrument: string;
}

export default function EditorParent(props: EditorParentProps) {
  const [text, setText] = useState("");

  return (
    <>
      <EditorHeader title={props.instrument} />
      <Divider
        sx={{
          height: 10,
          borderTopWidth: 2,
        }}
      ></Divider>
      <TextEditor instrument={props.instrument} text={text} setText={setText} />
    </>
  );
}
