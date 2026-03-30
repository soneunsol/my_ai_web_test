import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from './NavBar.jsx';
import BottomNav from './BottomNav.jsx';

const MainLayout = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', justifyContent: 'center' }}>
      <NavBar />
      <Box
        component="main"
        sx={{
          pt: '56px',  // NavBar 높이
          pb: '68px',  // BottomNav 높이
          minHeight: '100vh',
          width: '100%',
          maxWidth: 480,
        }}
      >
        <Outlet />
      </Box>
      <BottomNav />
    </Box>
  );
};

export default MainLayout;
