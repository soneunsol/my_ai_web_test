import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNav = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <AppBar position="sticky" elevation={4}>
      <Toolbar>
        <Typography
          variant="h2"
          sx={{ flexGrow: 1, cursor: 'pointer', fontSize: '1.25rem' }}
          onClick={() => handleNav('/')}
        >
          My Portfolio
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <Box sx={{ width: 200 }}>
                <List>
                  {NAV_ITEMS.map((item) => (
                    <ListItem key={item.path} disablePadding>
                      <ListItemButton
                        selected={location.pathname === item.path}
                        onClick={() => handleNav(item.path)}
                      >
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          NAV_ITEMS.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              onClick={() => handleNav(item.path)}
              sx={{
                fontWeight: location.pathname === item.path ? 700 : 400,
                borderBottom: location.pathname === item.path ? '2px solid white' : 'none',
                borderRadius: 0,
              }}
            >
              {item.label}
            </Button>
          ))
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
