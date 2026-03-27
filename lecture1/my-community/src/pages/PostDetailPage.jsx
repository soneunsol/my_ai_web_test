import { useState, useEffect } from 'react';
import {
  Typography, Box, Card, CardContent, Divider,
  TextField, Button, CircularProgress, Alert, IconButton, Chip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { getPost, deletePost, incrementViews } from '../services/postService';
import { getComments, createComment, deleteComment } from '../services/commentService';
import { getLikes, addLike, removeLike } from '../services/likeService';
import useAuth from '../hooks/useAuth';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    Promise.all([getPost(id), getComments(id), getLikes(id)])
      .then(([postData, commentsData, likesData]) => {
        setPost(postData);
        setComments(commentsData);
        setLikes(likesData);
        incrementViews(id);
      })
      .catch(() => setError('게시글을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

  const isLiked = user ? likes.some((l) => l.user_id === user.id) : false;

  const handleToggleLike = async () => {
    if (!user) { navigate('/login'); return; }
    setLikeLoading(true);
    try {
      if (isLiked) {
        await removeLike(id, user.id);
        setLikes((prev) => prev.filter((l) => l.user_id !== user.id));
      } else {
        await addLike(id, user.id);
        setLikes((prev) => [...prev, { user_id: user.id }]);
      }
    } finally {
      setLikeLoading(false);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('게시글을 삭제하시겠습니까?')) return;
    await deletePost(id);
    navigate('/');
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      const comment = await createComment(newComment, id, user.id);
      setComments((prev) => [...prev, comment]);
      setNewComment('');
    } catch {
      setError('댓글 작성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  if (loading) return <Layout><Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box></Layout>;
  if (error) return <Layout><Alert severity="error">{error}</Alert></Layout>;

  return (
    <Layout>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 2 }}>
        목록으로
      </Button>

      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, flex: 1 }}>
              {post.title}
            </Typography>
            {user?.id === post.user_id && (
              <IconButton color="error" onClick={handleDeletePost} size="small">
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mt: 1, mb: 2, alignItems: 'center' }}>
            <Chip label={post.profiles?.username || '알 수 없음'} size="small" />
            <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
              {new Date(post.created_at).toLocaleString('ko-KR')}
            </Typography>
          </Box>

          {post.hashtags?.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
              {post.hashtags.map((tag) => (
                <Chip key={tag} label={`#${tag}`} size="small" variant="outlined" color="primary" />
              ))}
            </Box>
          )}

          <Divider sx={{ mb: 2 }} />

          {post.image_url && (
            <Box sx={{ mb: 2 }}>
              <img
                src={post.image_url}
                alt="게시글 이미지"
                style={{ width: '100%', maxWidth: 600, borderRadius: 8, display: 'block' }}
              />
            </Box>
          )}

          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
            {post.content}
          </Typography>

          {/* 좋아요 버튼 */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, gap: 1 }}>
            <IconButton
              onClick={handleToggleLike}
              disabled={likeLoading}
              color={isLiked ? 'error' : 'default'}
            >
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {likes.length}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        댓글 {comments.length}개
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
        {comments.map((comment) => (
          <Card key={comment.id} elevation={1}>
            <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip label={comment.profiles?.username || '알 수 없음'} size="small" variant="outlined" />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(comment.created_at).toLocaleString('ko-KR')}
                  </Typography>
                </Box>
                {user?.id === comment.user_id && (
                  <IconButton size="small" color="error" onClick={() => handleDeleteComment(comment.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {comment.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {user ? (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleAddComment()}
          />
          <Button variant="contained" onClick={handleAddComment} disabled={submitting}>
            등록
          </Button>
        </Box>
      ) : (
        <Alert severity="info">
          댓글을 작성하려면 <Button size="small" onClick={() => navigate('/login')}>로그인</Button>이 필요합니다.
        </Alert>
      )}
    </Layout>
  );
};

export default PostDetailPage;
