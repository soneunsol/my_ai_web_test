import React from 'react';
import { Box, Typography, Button, Divider, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SKILLS = ['React', 'JavaScript', 'MUI', 'HTML/CSS', 'Git'];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 2,
        py: 6,
      }}
    >
      <Box sx={{ maxWidth: 720, width: '100%', textAlign: 'center' }}>
        {/* Hero */}
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 3,
            p: { xs: 4, md: 6 },
            mb: 4,
          }}
        >
          <Typography variant="caption" sx={{ letterSpacing: 3, opacity: 0.8, display: 'block', mb: 1 }}>
            WELCOME TO MY PORTFOLIO
          </Typography>
          <Typography variant="h1" sx={{ mb: 2 }}>
            안녕하세요 👋
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.8 }}>
            저는 React와 MUI를 활용해 사용자 중심의 웹 서비스를 만드는 프론트엔드 개발자입니다.
            <br />
            이 포트폴리오에서 저의 작업물과 이야기를 확인해보세요.
          </Typography>
        </Box>

        {/* Skills */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 3,
            p: 4,
            mb: 4,
            boxShadow: 2,
          }}
        >
          <Typography variant="h2" sx={{ mb: 3, color: 'text.primary' }}>
            기술 스택
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {SKILLS.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                color="primary"
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            ))}
          </Box>
        </Box>

        {/* CTA */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/projects')}
            sx={{ px: 4 }}
          >
            Projects 보기
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/contact')}
            sx={{ px: 4 }}
          >
            Contact
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
