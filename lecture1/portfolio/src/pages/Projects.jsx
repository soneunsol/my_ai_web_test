import React from 'react';
import { Box, Typography, Divider, Card, CardContent, Chip } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WebIcon from '@mui/icons-material/Web';

const PROJECTS = [
  {
    id: 1,
    icon: <RocketLaunchIcon sx={{ color: '#c084fc', fontSize: 28 }} />,
    title: 'AI바이브코딩웹 포트폴리오',
    description:
      'React + MUI + Vite 기반의 포트폴리오 사이트. 오로라 배경 애니메이션, 글래스모피즘 카드 디자인, 반응형 네비게이션을 구현. GitHub Actions를 통한 자동 배포(CI/CD) 파이프라인 구축.',
    tags: ['React', 'MUI', 'Vite', 'GitHub Actions', 'GitHub Pages'],
    gradient: 'rgba(123, 47, 247, 0.15)',
  },
  {
    id: 2,
    icon: <AutoAwesomeIcon sx={{ color: '#00c8ff', fontSize: 28 }} />,
    title: '오로라 랜딩 페이지',
    description:
      '순수 HTML/CSS/JS로 구현한 인터랙티브 랜딩 페이지. 별빛 트윈클 애니메이션(180개 별), 오로라 플로우 이펙트, 플로팅 SVG 기하학적 오브, 글래스모피즘 카드를 포함한 완성도 높은 UI.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'SVG', 'Animation'],
    gradient: 'rgba(0, 200, 255, 0.12)',
  },
  {
    id: 3,
    icon: <WebIcon sx={{ color: '#ff3cac', fontSize: 28 }} />,
    title: 'React MUI 컴포넌트 라이브러리',
    description:
      'MUI 디자인 시스템을 기반으로 한 재사용 컴포넌트 모음. 다크 테마, 글래스모피즘 스타일의 Card, NavBar, Button 등 커스텀 컴포넌트 설계. 코드 컨벤션 가이드 준수.',
    tags: ['React', 'MUI', 'Design System', 'TypeScript'],
    gradient: 'rgba(255, 60, 172, 0.12)',
  },
];

const Projects = () => (
  <Box
    sx={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      justifyContent: 'center',
      px: 2,
      py: 6,
    }}
  >
    <Box sx={{ maxWidth: 720, width: '100%' }}>

      {/* 헤더 */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="caption"
          sx={{ letterSpacing: 4, color: '#00c8ff', display: 'block', mb: 1, textTransform: 'uppercase' }}
        >
          What I've Built
        </Typography>
        <Typography
          variant="h1"
          sx={{
            color: '#fff',
            fontWeight: 700,
            textShadow: '0 0 20px rgba(123,47,247,0.5)',
            mb: 2,
          }}
        >
          Projects
        </Typography>
        <Box
          sx={{
            width: 56,
            height: 2,
            background: 'linear-gradient(90deg, #7b2ff7, #00c8ff)',
            borderRadius: 1,
            mx: 'auto',
            mb: 2,
          }}
        />
        <Typography variant="body1" sx={{ color: 'rgba(220,215,255,0.7)' }}>
          AI 바이브코딩으로 완성한 프로젝트들을 소개합니다.
        </Typography>
      </Box>

      {/* 프로젝트 카드들 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {PROJECTS.map((project) => (
          <Card key={project.id}>
            <CardContent sx={{ p: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  mb: 2,
                  p: 1.5,
                  borderRadius: 2,
                  background: project.gradient,
                  width: 'fit-content',
                }}
              >
                {project.icon}
                <Typography variant="h3" sx={{ color: '#fff', fontWeight: 600 }}>
                  {project.title}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ color: 'rgba(220,215,255,0.85)', lineHeight: 1.9, mb: 3 }}>
                {project.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {project.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      color: 'rgba(210,200,240,0.9)',
                      fontSize: '0.78rem',
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  </Box>
);

export default Projects;
