import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Code as CodeIcon, Brush as BrushIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { signOut } from '../../services/authService';

const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <AppBar position="static" elevation={4}>
      <Toolbar>
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', flexGrow: 1 }}
          onClick={() => navigate('/')}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2, px: 1, py: 0.5 }}>
            <CodeIcon sx={{ fontSize: 20 }} />
            <BrushIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.1, letterSpacing: 0.5 }}>
              DevDesign Hub
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.75, lineHeight: 1 }}>
              Design &amp; Dev Sharing
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {user ? (
            <>
              <Button color="inherit" onClick={() => navigate('/write')}>
                글쓰기
              </Button>
              <Button color="inherit" onClick={handleSignOut}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                로그인
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                회원가입
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
