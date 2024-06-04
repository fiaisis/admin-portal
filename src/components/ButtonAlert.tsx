"use client";

import { useState } from "react";

import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";

export default function ButtonAlert() {
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    setShowAlert(true);
    // Optional: Automatically hide the alert after a certain period
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // Hide the alert after 3 seconds
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Submit
      </Button>
      {/* if showAlert is true render the alert */}
      {showAlert && (
        <Alert severity="success" onClose={() => setShowAlert(false)}>
          JSON specification file edited successfully.
        </Alert>
      )}
    </div>
  );
}
