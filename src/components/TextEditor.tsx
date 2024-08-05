'use client';
import React, { useRef, useState } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { useParams } from 'next/navigation';
import Box from '@mui/material/Box';
import { BASE_URL } from '../utils/constants';
interface TextEditorProps {
  instrument: string;
  specification: string;
  setSpecification: (specification: string) => void;
}

async function getSpecification(instrument: string) {
  const response = await fetch(`${BASE_URL}/api/instrument/${instrument}/specification`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return JSON.stringify(await response.json());
}

export default function TextEditor(props: TextEditorProps) {
  // [slug] from the app route is converted to the [instrument] in the api route
  const { slug } = useParams();

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [scheduledChange, setScheduledChange] = useState(false);
  const options = {
    automaticLayout: true,
    formatOnPaste: true,
    // Type 'string' is not assignable to type '"on" | "off" | "wordWrapColumn" | "bounded" | undefined'.
    wordWrap: 'on' as const,
    scrollBeyondLastLine: false,
  };

  // onChange get updated text (JSON), format the code after a 5 second delay
  const handleChange = () => {
    const updatedSpecification = editorRef?.current?.getModel()?.getValue();
    props.setSpecification(updatedSpecification as string);

    if (!scheduledChange) {
      setScheduledChange(true);
      setTimeout(() => {
        // non null check
        editorRef?.current?.getAction('editor.action.formatDocument')?.run();
        setScheduledChange(false);
      }, 5000); // 5 second delay
    }
  };

  const handleEditorDidMount: OnMount = async (MonacoEditor) => {
    if (MonacoEditor) {
      editorRef.current = MonacoEditor;
      // update displayed json with retrieved JSON specification
      const initialSpecification = await getSpecification(slug as string);
      props.setSpecification(initialSpecification);
      // Format the initial code on load
      setTimeout(() => {
        MonacoEditor.getAction('editor.action.formatDocument')?.run();
      }, 100); // Delay to ensure editor is fully loaded
    }
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }} data-cy="SpecificationJSON">
      <MonacoEditor
        defaultLanguage="json"
        options={options}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        value={props.specification}
      />
    </Box>
  );
}
