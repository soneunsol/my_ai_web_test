import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from './NavBar.jsx';
import BottomNav from './BottomNav.jsx';

const MainLayout = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <NavBar />
      <Box
        component="main"
        sx={{
          pt: '56px',  // NavBar 높이
          pb: '68px',  // BottomNav 높이
          minHeight: '100vh',
          maxWidth: 480,
          mx: 'auto',
          width: '100%',
        }}
      >
        <Outlet />
      </Box>
      <BottomNav />
    </Box>
  );
};

export default MainLayout;
