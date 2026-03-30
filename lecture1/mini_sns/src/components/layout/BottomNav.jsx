import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Paper, BottomNavigation, BottomNavigationAction, Fab, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleIcon from '@mui/icons-material/People';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const getNavValue = () => {
    if (path === '/') return 0;
    if (path === '/gathering') return 1;
    if (path === '/chat' || path.startsWith('/chat/')) return 3;
    if (path === '/mypage') return 4;
    return false;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'sticky',
        bottom: 0,
        width: '100%',
        borderTop: '1px solid rgba(255,107,53,0.15)',
        bgcolor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        mt: 'auto',
      }}
    >
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <BottomNavigation
          value={getNavValue()}
          sx={{ bgcolor: 'transparent', width: '100%', height: 60 }}
        >
          <BottomNavigationAction
            icon={path === '/' ? <HomeIcon /> : <HomeOutlinedIcon />}
            onClick={() => navigate('/')}
            sx={{ color: path === '/' ? '#FF6B35' : '#aaa', minWidth: 60 }}
          />
          <BottomNavigationAction
            icon={path === '/gathering' ? <PeopleIcon /> : <PeopleOutlineIcon />}
            onClick={() => navigate('/gathering')}
            sx={{ color: path === '/gathering' ? '#FF6B35' : '#aaa', minWidth: 60 }}
          />

          {/* 가운데 게시물 작성 버튼 자리 */}
          <BottomNavigationAction
            icon={<Box sx={{ width: 48, height: 48 }} />}
            sx={{ minWidth: 60, pointerEvents: 'none' }}
          />

          <BottomNavigationAction
            icon={path.startsWith('/chat') ? <ChatIcon /> : <ChatOutlinedIcon />}
            onClick={() => navigate('/chat')}
            sx={{ color: path.startsWith('/chat') ? '#FF6B35' : '#aaa', minWidth: 60 }}
          />
          <BottomNavigationAction
            icon={path === '/mypage' ? <PersonIcon /> : <PersonOutlineIcon />}
            onClick={() => navigate('/mypage')}
            sx={{ color: path === '/mypage' ? '#FF6B35' : '#aaa', minWidth: 60 }}
          />
        </BottomNavigation>

        {/* 중앙 FAB 버튼 */}
        <Fab
          size="medium"
          onClick={() => navigate('/create')}
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: 8,
            background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
            color: 'white',
            boxShadow: '0 4px 14px rgba(255,107,53,0.5)',
            '&:hover': { background: 'linear-gradient(135deg, #E55A28, #E8A030)' },
            width: 48,
            height: 48,
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Paper>
  );
};

export default BottomNav;
