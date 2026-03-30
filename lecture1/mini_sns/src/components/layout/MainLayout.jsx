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
          pt: '56px',
          pb: '68px',
          minHeight: '100vh',
          maxWidth: '480px',
          marginLeft: 'auto',
          marginRight: 'auto',
          overflow: 'hidden',
        }}
      >
        <Outlet />
      </Box>
      <BottomNav />
    </Box>
  );
};

export default MainLayout;
