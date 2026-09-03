import { useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';

import BrandLogo from '../components/common/brand-logo';
import PageShell from '../components/ui/page-shell';
import { useAuth } from '../hooks/auth-context';

/**
 * LoginPage 컴포넌트
 * 로고 / 로그인 폼 / 테스트 계정 둘러보기 / 회원가입 이동을 제공한다.
 *
 * Example usage:
 * <Route path="/login" element={ <LoginPage /> } />
 */
function LoginPage() {
  const { user, signIn, signInAsGuest } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/posts" replace />;
  }

  /** 입력한 아이디/비밀번호로 로그인한다. */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await signIn({ username: username.trim(), password });
      navigate('/posts', { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /** 로그인 없이 테스트 계정으로 둘러본다. */
  const handleGuestSignIn = async () => {
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await signInAsGuest();
      navigate('/posts', { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell maxWidth="sm" isCentered>
      <Box sx={ { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: { xs: 3, md: 4 } } }>
        <BrandLogo size={ 92 } />

        <Paper
          elevation={ 0 }
          sx={ {
            width: '100%',
            p: { xs: 3, md: 4 },
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 18px 40px rgba(28, 24, 48, 0.06)',
          } }
        >
          <Typography
            component="h1"
            sx={ { fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 800, textAlign: 'center' } }
          >
            로그인
          </Typography>

          <Typography
            component="p"
            sx={ {
              mt: 1,
              mb: 3,
              textAlign: 'center',
              fontSize: { xs: '0.875rem', md: '0.9375rem' },
              color: 'text.secondary',
            } }
          >
            개발과 디자인 이야기를 함께 나눠요.
          </Typography>

          { errorMessage && <Alert severity="error" sx={ { mb: 2 } }>{ errorMessage }</Alert> }

          <Box component="form" onSubmit={ handleSubmit } sx={ { display: 'flex', flexDirection: 'column', gap: 2 } }>
            <TextField
              label="아이디"
              value={ username }
              onChange={ (event) => setUsername(event.target.value) }
              fullWidth
              autoComplete="username"
            />

            <TextField
              label="비밀번호"
              type="password"
              value={ password }
              onChange={ (event) => setPassword(event.target.value) }
              fullWidth
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={ !username.trim() || !password || isSubmitting }
              sx={ { mt: 1 } }
            >
              { isSubmitting ? '확인 중...' : '로그인' }
            </Button>
          </Box>

          <Divider sx={ { my: 3, fontSize: '0.75rem', color: 'text.secondary' } }>또는</Divider>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={ <ExploreOutlinedIcon /> }
            onClick={ handleGuestSignIn }
            disabled={ isSubmitting }
          >
            테스트 계정으로 둘러보기
          </Button>

          <Box sx={ { mt: 3, textAlign: 'center', fontSize: '0.875rem', color: 'text.secondary' } }>
            아직 회원이 아니신가요?{ ' ' }
            <Box
              component={ RouterLink }
              to="/signup"
              sx={ { color: 'primary.main', fontWeight: 700, textDecoration: 'none' } }
            >
              회원가입하기
            </Box>
          </Box>
        </Paper>
      </Box>
    </PageShell>
  );
}

export default LoginPage;
