"use client";
import React, { useEffect, useRef } from "react";

import Editor, { useMonaco } from "@monaco-editor/react";

export default function TextEditor() {
  const monaco = useMonaco();
  const editorRef = useRef(null);
  useEffect(() => {
    if (monaco) {
      console.log("monaco instance for making changes pre mount:", monaco);
    }
  }, [monaco]);
  const options = {
    automaticLayout: true,
    formatOnPaste: true,
    lineWrap: "on",
    wordWrap: "on",
    scrollBeyondLastLine: false,
  };

  // onChange get updated text (JSON), format the code after a 5 second delay
  const handleChange = () => {
    const updatedText = editorRef.current.getModel().getValue();
    console.log(updatedText);

    setTimeout(() => {
      editorRef.current.getAction("editor.action.formatDocument").run();
    }, 5000);
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Format the initial code on load
    setTimeout(() => {
      editor.getAction("editor.action.formatDocument").run();
    }, 100); // Delay to ensure editor is fully loaded
  };

  return (
    <Editor
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
