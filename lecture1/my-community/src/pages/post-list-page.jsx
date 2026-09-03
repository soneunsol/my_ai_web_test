import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import AppHeader from '../components/common/app-header';
import EmptyState from '../components/ui/empty-state';
import PageShell from '../components/ui/page-shell';
import PostCard from '../components/post/post-card';
import PostFormDialog from '../components/post/post-form-dialog';
import { createPost, fetchPosts } from '../lib/community-api';
import { useAuth } from '../hooks/auth-context';

/**
 * PostListPage 컴포넌트
 * 환영 메시지 / 게시물 추가 버튼 / 게시물 목록을 보여주는 메인 화면.
 *
 * Example usage:
 * <Route path="/posts" element={ <PostListPage /> } />
 */
function PostListPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  /** 게시물 목록을 다시 불러온다. */
  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      setPosts(await fetchPosts({ currentUserId: user?.id ?? null }));
    } catch (error) {
      setErrorMessage(`게시물을 불러오지 못했어요. (${ error.message })`);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  /** 새 게시물을 등록하고 목록을 갱신한다. */
  const handleCreatePost = async (payload) => {
    await createPost({ ...payload, authorId: user.id });
    await loadPosts();
  };

  const normalizedKeyword = keyword.trim().toLowerCase();
  const visiblePosts = normalizedKeyword
    ? posts.filter((post) => {
      const haystack = [post.title, post.content, ...post.tags].join(' ').toLowerCase();

      return haystack.includes(normalizedKeyword);
    })
    : posts;

  return (
    <>
      <AppHeader />

      <PageShell maxWidth="md">
        <Paper
          elevation={ 0 }
          sx={ {
            p: { xs: 2.5, md: 4 },
            mb: { xs: 2.5, md: 4 },
            borderRadius: 1,
            color: 'common.white',
            background: 'linear-gradient(120deg, #5B4BE8 0%, #8A5BE8 55%, #F26DA8 100%)',
            boxShadow: '0 18px 40px rgba(91, 75, 232, 0.24)',
          } }
        >
          <Grid container spacing={ 2 } alignItems="center">
            <Grid size={ { xs: 12, md: 8 } }>
              <Typography
                component="h1"
                sx={ { fontSize: { xs: '1.375rem', md: '1.875rem' }, fontWeight: 800, lineHeight: 1.3 } }
              >
                { user?.nickname }님 환영해요! 👋
              </Typography>

              <Typography
                component="p"
                sx={ { mt: 1, fontSize: { xs: '0.875rem', md: '1rem' }, opacity: 0.9, lineHeight: 1.6 } }
              >
                오늘도 좋은 개발·디자인 인사이트를 나눠주세요.
              </Typography>
            </Grid>

            <Grid size={ { xs: 12, md: 4 } }>
              <Button
                fullWidth
                size="large"
                startIcon={ <AddRoundedIcon /> }
                onClick={ () => setIsFormOpen(true) }
                sx={ {
                  bgcolor: 'common.white',
                  color: 'primary.main',
                  fontWeight: 700,
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.88)' },
                } }
              >
                게시물 추가
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <TextField
          value={ keyword }
          onChange={ (event) => setKeyword(event.target.value) }
          placeholder="제목, 내용, 해시태그로 검색"
          fullWidth
          size="small"
          sx={ { mb: { xs: 2, md: 3 }, bgcolor: 'background.paper' } }
          slotProps={ {
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={ { color: 'text.secondary' } } />
                </InputAdornment>
              ),
            },
          } }
        />

        { errorMessage && (
          <Alert severity="error" sx={ { mb: 2 } }>
            { errorMessage }
          </Alert>
        ) }

        { isLoading ? (
          <Box sx={ { display: 'flex', justifyContent: 'center', py: { xs: 6, md: 10 } } }>
            <CircularProgress />
          </Box>
        ) : visiblePosts.length === 0 ? (
          <EmptyState
            title={ normalizedKeyword ? '검색 결과가 없어요' : '아직 게시물이 없어요' }
            description={
              normalizedKeyword ? '다른 키워드로 찾아보세요.' : '첫 번째 글의 주인공이 되어보세요!'
            }
          />
        ) : (
          <Box sx={ { display: 'flex', flexDirection: 'column', gap: { xs: 1.5, md: 2 } } }>
            { visiblePosts.map((post) => (
              <PostCard key={ post.id } post={ post } onClick={ () => navigate(`/posts/${ post.id }`) } />
            )) }
          </Box>
        ) }
      </PageShell>

      <PostFormDialog
        isOpen={ isFormOpen }
        onClose={ () => setIsFormOpen(false) }
        onSubmit={ handleCreatePost }
      />
    </>
  );
}

export default PostListPage;
