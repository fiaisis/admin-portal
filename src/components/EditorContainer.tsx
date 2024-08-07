'use client';

import { Divider } from '@mui/material';
import EditorHeader from '@/components/EditorHeader';
import TextEditor from '@/components/TextEditor';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { BASE_URL } from '../utils/constants';

interface EditorContainerProps {
  instrument: string;
}

export default function EditorContainer(props: EditorContainerProps) {
  const [specification, setSpecification] = useState('');

  async function updateSpecification() {
    const response = await fetch(`${BASE_URL}/api/instrument/${props.instrument}/specification`, {
      method: 'PUT',
      body: JSON.stringify({
        specification: JSON.parse(specification),
      }),
    });

    if (!response.ok) {
      const responseObj = {
        statusCode: response.status,
        contents: 'Specification update failed',
      };

      console.error('Specification update failed');
      return JSON.stringify(responseObj);
    } else {
      const responseObj = {
        statusCode: response.status,
        contents: 'Specification updated successfully',
      };
      return JSON.stringify(responseObj);
    }
  }

  return (
    <Box
      sx={{
        height: '95vh',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '80vw',
        width: '100%',
      }}
    >
      <EditorHeader title={props.instrument} specification={specification} handleSubmit={updateSpecification} />
      <Divider
        sx={{
          height: 10,
        }}
      />
      <TextEditor instrument={props.instrument} specification={specification} setSpecification={setSpecification} />
    </Box>
  );
}
