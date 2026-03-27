import { useState } from 'react';
import {
  Typography, TextField, Button, Box, Alert,
  Chip, IconButton, Tooltip,
} from '@mui/material';
import {
  AddPhotoAlternate as ImageIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { createPost } from '../services/postService';
import useAuth from '../hooks/useAuth';

const RANDOM_IMAGE_API = 'https://picsum.photos/800/400?random=';

const PostWritePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [hashtagInput, setHashtagInput] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRandomImage = () => {
    const seed = Math.floor(Math.random() * 1000);
    setImageUrl(`${RANDOM_IMAGE_API}${seed}`);
  };

  const handleAddHashtag = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && hashtagInput.trim()) {
      e.preventDefault();
      const tag = hashtagInput.trim().replace(/^#/, '');
      if (tag && !hashtags.includes(tag)) {
        setHashtags((prev) => [...prev, tag]);
      }
      setHashtagInput('');
    }
  };

  const handleRemoveHashtag = (tag) => {
    setHashtags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 입력해주세요.');
      return;
    }
    setSubmitting(true);
    try {
      const post = await createPost(title, content, user.id, imageUrl || null, hashtags);
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

        {/* 랜덤 이미지 */}
        <Box>
          <Tooltip title="랜덤 이미지 추가">
            <Button
              variant="outlined"
              startIcon={<ImageIcon />}
              onClick={handleRandomImage}
            >
              랜덤 이미지 추가
            </Button>
          </Tooltip>
          {imageUrl && (
            <Box sx={{ mt: 1, position: 'relative', display: 'inline-block' }}>
              <img
                src={imageUrl}
                alt="미리보기"
                style={{ width: '100%', maxWidth: 400, borderRadius: 8, display: 'block' }}
              />
              <IconButton
                size="small"
                onClick={() => setImageUrl('')}
                sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(0,0,0,0.5)', color: '#fff' }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>

        {/* 해시태그 */}
        <Box>
          <TextField
            fullWidth
            label="해시태그 (Enter 또는 Space로 추가)"
            variant="outlined"
            value={hashtagInput}
            onChange={(e) => setHashtagInput(e.target.value)}
            onKeyDown={handleAddHashtag}
            placeholder="#태그입력"
          />
          {hashtags.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, mt: 1, flexWrap: 'wrap' }}>
              {hashtags.map((tag) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  onDelete={() => handleRemoveHashtag(tag)}
                />
              ))}
            </Box>
          )}
        </Box>

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
