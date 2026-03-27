import { useState } from 'react';
import { Typography, TextField, Button, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { createPost } from '../services/postService';
import useAuth from '../hooks/useAuth';

const PostWritePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 입력해주세요.');
      return;
    }
    setSubmitting(true);
    try {
      const post = await createPost(title, content, user.id);
      navigate(`/posts/${post.id}`);
    } catch {
      setError('게시글 작성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Layout>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        글쓰기
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="제목"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          label="내용"
          variant="outlined"
          multiline
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={() => navigate('/')}>
            취소
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
            등록
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default PostWritePage;
