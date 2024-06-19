"use client";

import { Divider } from "@mui/material";
import EditorHeader from "@/components/EditorHeader";
import TextEditor from "@/components/TextEditor";
import { useState } from "react";

interface EditorContainerProps {
  instrument: string;
}

export default function EditorContainer(props: EditorContainerProps) {
  const [specification, setSpecification] = useState("");

  async function updateSpecification() {
    const response = await fetch(`/api/instrument`, {
      method: "PUT",
      body: JSON.stringify({
        instrument: props.instrument,
        specification: JSON.parse(specification),
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
        specification={specification}
        handleSubmit={updateSpecification}
      />
      <Divider
        sx={{
          height: 10,
          borderTopWidth: 2,
        }}
      ></Divider>
      <TextEditor
        instrument={props.instrument}
        specification={specification}
        setSpecification={setSpecification}
      />
    </>
  );
}
