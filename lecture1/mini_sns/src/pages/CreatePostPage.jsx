import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, TextField, Button, Typography, IconButton,
  CircularProgress, Chip, Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TagIcon from '@mui/icons-material/Tag';
import { createPost, getRandomFoodImage } from '../services/postService';
import { useAuth } from '../store/AuthContext.jsx';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [hashtagInput, setHashtagInput] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setImageUrl(getRandomFoodImage());
  }, []);

  const handleRefreshImage = () => {
    setImageUrl(getRandomFoodImage());
  };

  const handleAddHashtag = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const tag = hashtagInput.trim().replace('#', '');
      if (tag && !hashtags.includes(tag)) {
        setHashtags(prev => [...prev, tag]);
      }
      setHashtagInput('');
    }
  };

  const handleRemoveHashtag = (tag) => {
    setHashtags(prev => prev.filter(t => t !== tag));
  };

  const handleSubmit = async () => {
    if (!caption.trim()) { setError('내용을 입력해주세요.'); return; }
    setError('');
    setLoading(true);
    try {
      await createPost({
        userId: user.id,
        imageUrl,
        caption: caption.trim(),
        hashtags,
        location: location.trim(),
      });
      navigate('/');
    } catch (err) {
      setError('게시물 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* 헤더 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          bgcolor: 'white',
          borderBottom: '1px solid rgba(255,107,53,0.15)',
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ color: '#FF6B35' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h3" fontWeight={700}>새 게시물</Typography>
        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            background: 'linear-gradient(135deg, #FF6B35, #FFB347)',
            boxShadow: 'none',
            borderRadius: 2,
          }}
        >
          {loading ? <CircularProgress size={18} color="inherit" /> : '공유'}
        </Button>
      </Box>

      <Box sx={{ px: 2, py: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* 이미지 미리보기 */}
        <Box sx={{ position: 'relative', mb: 2, borderRadius: 2, overflow: 'hidden' }}>
          <Box
            component="img"
            src={imageUrl}
            alt="음식"
            sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
            onError={(e) => { e.target.src = `https://picsum.photos/400/400?random=${Math.random()}`; }}
          />
          <IconButton
            onClick={handleRefreshImage}
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Box>

        {/* 내용 입력 */}
        <TextField
          fullWidth
          multiline
          rows={3}
          label="무슨 맛집인지 알려주세요..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* 해시태그 */}
        <TextField
          fullWidth
          label="해시태그 (Enter 또는 Space로 추가)"
          value={hashtagInput}
          onChange={(e) => setHashtagInput(e.target.value)}
          onKeyDown={handleAddHashtag}
          InputProps={{ startAdornment: <TagIcon sx={{ mr: 1, color: '#FF6B35' }} /> }}
          sx={{ mb: 1 }}
        />
        {hashtags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {hashtags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                onDelete={() => handleRemoveHashtag(tag)}
                size="small"
                sx={{ bgcolor: '#FFF0E8', color: '#FF6B35', fontWeight: 500 }}
              />
            ))}
          </Box>
        )}

        {/* 위치 */}
        <TextField
          fullWidth
          label="위치 추가"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          InputProps={{ startAdornment: <LocationOnIcon sx={{ mr: 1, color: '#FF6B35' }} /> }}
        />
      </Box>
    </Box>
  );
};

export default CreatePostPage;
