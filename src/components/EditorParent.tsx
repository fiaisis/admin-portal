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

  async function updateSpecification() {
    const response = await fetch(`/api/instrument`, {
      method: "PUT",
      body: JSON.stringify({
        instrument: props.instrument,
        specification: JSON.parse(text),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return JSON.stringify(await response.json());
  }

  return (
    <>
      <EditorHeader
        title={props.instrument}
        specification={text}
        handleSubmit={updateSpecification}
      />
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
