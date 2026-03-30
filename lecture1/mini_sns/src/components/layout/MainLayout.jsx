import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from './NavBar.jsx';
import BottomNav from './BottomNav.jsx';

const MainLayout = () => {
  return (
    // 데스크탑: 오렌지 그라데이션 배경 + 중앙 정렬
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        '@media (min-width: 481px)': {
          background: 'linear-gradient(135deg, #FF6B35 0%, #FFB347 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        },
      }}
    >
      {/* 모바일 앱 프레임: flex column으로 상단 NavBar / 중간 스크롤 / 하단 BottomNav */}
      <Box
        sx={{
          width: '100%',
          flex: '0 1 480px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          overflow: 'hidden',
          '@media (min-width: 481px)': {
            boxShadow: '0 0 60px rgba(0,0,0,0.25)',
          },
        }}
      >
        {/* 상단 NavBar (sticky) */}
        <NavBar />

        {/* 스크롤 가능한 컨텐츠 영역 */}
        <Box component="main" sx={{ flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </Box>

        {/* 하단 BottomNav (항상 하단 고정) */}
        <BottomNav />
      </Box>
    </Box>
  );
};

export default MainLayout;
