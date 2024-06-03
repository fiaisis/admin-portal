"use client";
import React from "react";

import Editor from "@monaco-editor/react";

export default function TextEditor() {
  const options = { automaticLayout: true, wordWrap: "on", lineWrap: "on" };
  return (
    // height and width to be controlled by parent element and flex
    <Editor
      // height="90vh"
      // width="70vw"
      defaultLanguage="json"
      options={options}
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
