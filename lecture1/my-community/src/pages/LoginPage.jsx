import { useState } from 'react';
import {
  Box, Card, CardContent, Typography,
  TextField, Button, Alert, Link,
} from '@mui/material';
import { Code as CodeIcon, Brush as BrushIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/authService';

const Logo = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
    <Box
      sx={{
        display: 'flex', alignItems: 'center', gap: 1,
        bgcolor: 'primary.main', borderRadius: 3, px: 3, py: 1.5, mb: 1,
      }}
    >
      <CodeIcon sx={{ color: '#fff', fontSize: 28 }} />
      <BrushIcon sx={{ color: '#fff', fontSize: 28 }} />
    </Box>
    <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', letterSpacing: 1 }}>
      DevDesign Hub
    </Typography>
    <Typography variant="caption" color="text.secondary">
      Design &amp; Dev Sharing Community
    </Typography>
  </Box>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      const msg = err?.message || '';
      if (msg.includes('Email not confirmed')) {
        setError('이메일 인증이 필요합니다. 가입 시 받은 이메일의 인증 링크를 클릭해주세요.');
      } else if (msg.includes('Invalid login credentials')) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setError(`로그인 실패: ${msg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Card elevation={4} sx={{ width: '100%', maxWidth: 400, p: 2 }}>
        <CardContent>
          <Logo />

          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
            로그인
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="이메일"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <TextField
              fullWidth
              label="비밀번호"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button fullWidth variant="contained" size="large" onClick={handleLogin} disabled={loading}>
              {loading ? '로그인 중...' : '로그인'}
            </Button>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              계정이 없으신가요?{' '}
              <Link component="button" onClick={() => navigate('/register')}>
                회원가입하러가기
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
