import React from 'react';
import { Box, Typography, Divider, Card, CardContent } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

const SECTIONS = [
  {
    icon: <PersonIcon color="primary" />,
    title: '자기소개',
    content:
      'About Me 페이지가 개발될 공간입니다. 상세한 자기소개가 들어갈 예정입니다. 이름, 현재 역할, 관심 분야, 개발 철학 등을 이곳에 작성하게 됩니다.',
  },
  {
    icon: <SchoolIcon color="secondary" />,
    title: '학력 / 교육',
    content:
      '학력 및 수료한 교육 과정이 이곳에 들어갈 예정입니다. 대학교, 부트캠프, 온라인 강의 등의 이력을 기록합니다.',
  },
  {
    icon: <WorkIcon sx={{ color: 'success.main' }} />,
    title: '경력 / 경험',
    content:
      '인턴십, 프로젝트 참여 경험, 활동 이력 등이 이곳에 들어갈 예정입니다. 각 경험에서 배운 점과 기여한 내용을 상세히 작성합니다.',
  },
];

const About = () => (
  <Box
    sx={{
      minHeight: 'calc(100vh - 64px)',
      bgcolor: 'background.default',
      display: 'flex',
      justifyContent: 'center',
      px: 2,
      py: 6,
    }}
  >
    <Box sx={{ maxWidth: 720, width: '100%' }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h1" sx={{ color: 'primary.main', mb: 1 }}>
          About Me
        </Typography>
        <Divider sx={{ borderColor: 'primary.light', borderWidth: 2, width: 60, mx: 'auto' }} />
      </Box>

      {/* Section Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {SECTIONS.map(({ icon, title, content }) => (
          <Card key={title} elevation={2}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                {icon}
                <Typography variant="h3" sx={{ color: 'text.primary' }}>
                  {title}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                {content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  </Box>
);

export default About;
