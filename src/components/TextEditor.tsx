"use client";
import React, { useRef, useState } from "react";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";

export default function TextEditor() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [scheduledChange, setScheduledChange] = useState(false);
  const options = {
    automaticLayout: true,
    formatOnPaste: true,
    lineWrap: "on",
    // Type 'string' is not assignable to type '"on" | "off" | "wordWrapColumn" | "bounded" | undefined'.
    wordWrap: "on" as const,
    scrollBeyondLastLine: false,
  };

  // onChange get updated text (JSON), format the code after a 5 second delay
  const handleChange = () => {
    // for near future use to update specifications
    // const updatedText = editorRef.current.getModel().getValue();

    if (!scheduledChange) {
      setScheduledChange(true);
      setTimeout(() => {
        // non null check
        editorRef?.current?.getAction("editor.action.formatDocument")?.run();
        setScheduledChange(false);
      }, 5000); // 5 second delay
    }
  };

  const handleEditorDidMount: OnMount = (MonacoEditor) => {
    if (MonacoEditor) {
      editorRef.current = MonacoEditor;
      // Format the initial code on load
      setTimeout(() => {
        MonacoEditor.getAction("editor.action.formatDocument")?.run();
      }, 100); // Delay to ensure editor is fully loaded
    }
  };

  return (
    <MonacoEditor
      defaultLanguage="json"
      options={options}
      onChange={handleChange}
      onMount={handleEditorDidMount}
      defaultValue='[{
  "border": "{{int(1, 5)}}px {{random(solid, dotted, dashed)}} {{color()}}",
  "coordinates": {
    "type": "array",
    "count": 2,
    "items": "{{float(0, 120, 5)}}"
  },
  "password": "xX{{animal()}}-{{string(6, 10, *)}}"
},
{
  "border": "4px solid crimson",
  "coordinates": [
    55.69488,
    38.29534
  ],
  "password": "xXturkey-*********"
}]'
    />
  );
}
