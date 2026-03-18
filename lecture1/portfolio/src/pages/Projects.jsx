import React from 'react';
import { Box, Typography, Divider, Card, CardContent, Chip } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const PLACEHOLDER_PROJECTS = [
  {
    id: 1,
    title: '프로젝트 1',
    description: '포트폴리오 작품이 이곳에 들어갈 예정입니다. 프로젝트 개요, 사용 기술, 주요 기능을 소개합니다.',
    tags: ['React', 'MUI'],
  },
  {
    id: 2,
    title: '프로젝트 2',
    description: '포트폴리오 작품이 이곳에 들어갈 예정입니다. 프로젝트 개요, 사용 기술, 주요 기능을 소개합니다.',
    tags: ['JavaScript', 'CSS'],
  },
  {
    id: 3,
    title: '프로젝트 3',
    description: '포트폴리오 작품이 이곳에 들어갈 예정입니다. 프로젝트 개요, 사용 기술, 주요 기능을 소개합니다.',
    tags: ['React', 'Node.js'],
  },
];

const Projects = () => (
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
          Projects
        </Typography>
        <Divider sx={{ borderColor: 'primary.light', borderWidth: 2, width: 60, mx: 'auto', mb: 2 }} />
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다.
        </Typography>
      </Box>

      {/* Project Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {PLACEHOLDER_PROJECTS.map((project) => (
          <Card key={project.id} elevation={2}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <FolderOpenIcon color="secondary" />
                <Typography variant="h3" sx={{ color: 'text.primary' }}>
                  {project.title}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}>
                {project.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {project.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" color="secondary" variant="outlined" />
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
