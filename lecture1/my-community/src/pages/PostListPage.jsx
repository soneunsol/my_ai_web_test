import { useState, useEffect } from 'react';
import {
  Typography, Card, CardContent, CardActionArea,
  Box, Chip, CircularProgress, Alert, Fab,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { getPosts } from '../services/postService';
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
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        게시판
      </Typography>

      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">{error}</Alert>}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {posts.map((post) => (
          <Card key={post.id} elevation={2}>
            <CardActionArea onClick={() => navigate(`/posts/${post.id}`)}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {post.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1, alignItems: 'center' }}>
                  <Chip label={post.profiles?.username || '알 수 없음'} size="small" />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(post.created_at).toLocaleDateString('ko-KR')}
                  </Typography>
                </Box>
              </CardContent>
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
