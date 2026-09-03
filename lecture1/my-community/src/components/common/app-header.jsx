import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import BrandLogo from './brand-logo';
import { useAuth } from '../../hooks/auth-context';

/**
 * AppHeader 컴포넌트
 * 로고, 로그인 사용자 닉네임, 로그아웃 버튼을 담은 상단 바.
 *
 * Props:
 * @param {function} onSignOut - 로그아웃 버튼 클릭 시 실행할 함수 [Optional]
 *
 * Example usage:
 * <AppHeader onSignOut={ handleSignOut } />
 */
function AppHeader({ onSignOut }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    if (onSignOut) onSignOut();
    navigate('/login', { replace: true });
  };

  return (
    <AppBar
      position="sticky"
      elevation={ 0 }
      sx={ {
        bgcolor: 'rgba(255, 255, 255, 0.86)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      } }
    >
      <Container maxWidth="md" sx={ { px: { xs: 2, md: 3 } } }>
        <Toolbar disableGutters sx={ { minHeight: { xs: 60, md: 68 }, gap: 1 } }>
          <Box
            onClick={ () => navigate('/posts') }
            sx={ { cursor: 'pointer', display: 'flex', alignItems: 'center' } }
          >
            <BrandLogo size={ 34 } isVertical={ false } hasTagline={ false } />
          </Box>

          <Box sx={ { flexGrow: 1 } } />

          { user && (
            <Box sx={ { display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1.5 } } }>
              <Avatar
                sx={ {
                  width: 32,
                  height: 32,
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  bgcolor: 'primary.main',
                } }
              >
                { user.nickname?.slice(0, 1) ?? 'U' }
              </Avatar>

              <Typography
                component="span"
                sx={ {
                  display: { xs: 'none', sm: 'block' },
                  fontSize: '0.875rem',
                  fontWeight: 600,
                } }
              >
                { user.nickname }
              </Typography>

              <Button
                size="small"
                color="inherit"
                startIcon={ <LogoutRoundedIcon /> }
                onClick={ handleSignOut }
                sx={ { color: 'text.secondary', fontWeight: 600 } }
              >
                로그아웃
              </Button>
            </Box>
          ) }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppHeader;
