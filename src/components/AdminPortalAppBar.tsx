import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { BASE_URL } from '../utils/constants';

export default function AdminPortalAppBar() {
  return (
    <Box sx={{ height: '4vh', zIndex: 200, position: 'absolute', width: '100vw' }}>
      <AppBar position="static">
        <Box display="left" justifyContent="flex-start">
          <Toolbar sx={{ padding: '4px', gap: 1 }}>
            <Image
              src={`${BASE_URL}/fia-icon-32.png`}
              alt="FIA admin portal icon"
              width={50}
              height={50}
              style={{
                padding: '4px',
              }}
            />
            <Typography
              variant="h5"
              component={'h1'}
              noWrap
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
              }}
            >
              {' '}
              FIA-ADMIN-PORTAL
            </Typography>
          </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
}
