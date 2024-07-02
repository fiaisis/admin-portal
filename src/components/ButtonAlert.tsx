'use client';

import { useState } from 'react';

import { Button, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

interface ButtonAlertProps {
  instrument: string;
  specification: string;
  handleSubmit: () => Promise<string>;
}

export default function ButtonAlert(props: ButtonAlertProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState<{ [key: string]: string }>({});

  const handleClick = async () => {
    const serverResponse = JSON.parse(await props.handleSubmit());
    setAlertText(serverResponse);
    setShowAlert(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowAlert(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Submit
      </Button>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={alertText['statusText'] == 'OK' ? 'success' : 'error'} onClose={handleClose}>
          {JSON.stringify(alertText['contents'])}
        </Alert>
      </Snackbar>
    </div>
  );
}
