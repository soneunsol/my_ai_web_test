import { useState, useEffect } from 'react';
import {
  Typography, Card, CardContent, CardActionArea,
  Box, Chip, CircularProgress, Alert, Fab, Button,
} from '@mui/material';
import {
  Add as AddIcon,
  ChatBubbleOutline as CommentIcon,
  Visibility as ViewIcon,
  Favorite as LikeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { getPosts } from '../services/postService';
import { signOut } from '../services/authService';
import useAuth from '../hooks/useAuth';

const PostListPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setError('게시글을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      {user && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body1" color="primary" sx={{ fontWeight: 500 }}>
            {user.user_metadata?.username || user.email}님 환영해요!
          </Typography>
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            onClick={async () => { await signOut(); navigate('/login'); }}
          >
            로그아웃
          </Button>
        </Box>
      )}

      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        게시판
      </Typography>

      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">{error}</Alert>}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {posts.map((post) => (
          <Card key={post.id} elevation={2}>
            <CardActionArea onClick={() => navigate(`/posts/${post.id}`)}>
              <Box sx={{ display: 'flex' }}>
                {post.image_url && (
                  <Box sx={{ flexShrink: 0, width: 120, alignSelf: 'stretch' }}>
                    <img
                      src={post.image_url}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px 0 0 4px', display: 'block' }}
                    />
                  </Box>
                )}
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    {post.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Chip label={post.profiles?.username || '알 수 없음'} size="small" />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(post.created_at).toLocaleDateString('ko-KR')}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 'auto' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ViewIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {post.views ?? 0}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LikeIcon sx={{ fontSize: 14, color: 'error.light' }} />
                        <Typography variant="caption" color="text.secondary">
                          {post.likes?.[0]?.count ?? 0}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CommentIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {post.comments?.[0]?.count ?? 0}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  {post.hashtags?.length > 0 && (
                    <Box sx={{ display: 'flex', gap: 0.5, mt: 1, flexWrap: 'wrap' }}>
                      {post.hashtags.map((tag) => (
                        <Chip key={tag} label={`#${tag}`} size="small" variant="outlined" color="primary" />
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      {!loading && posts.length === 0 && !error && (
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography color="text.secondary">아직 게시글이 없습니다.</Typography>
        </Box>
      )}

      {user && (
        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 32, right: 32 }}
          onClick={() => navigate('/write')}
        >
          <AddIcon />
        </Fab>
      )}
    </Layout>
  );
};

export default PostListPage;
