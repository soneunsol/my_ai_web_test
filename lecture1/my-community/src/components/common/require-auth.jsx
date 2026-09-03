import { Navigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { useAuth } from '../../hooks/auth-context';

/**
 * RequireAuth 컴포넌트
 * 로그인하지 않은 사용자를 로그인 페이지로 돌려보내는 라우트 가드.
 *
 * Props:
 * @param {node} children - 보호할 화면 요소 [Required]
 *
 * Example usage:
 * <RequireAuth><PostListPage /></RequireAuth>
 */
function RequireAuth({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Box sx={ { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' } }>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={ { from: location.pathname } } replace />;
  }

  return children;
}

export default RequireAuth;
