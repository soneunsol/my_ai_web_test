import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';

import AuthProvider from './components/common/auth-provider';
import RequireAuth from './components/common/require-auth';
import LoginPage from './pages/login-page';
import PostDetailPage from './pages/post-detail-page';
import PostListPage from './pages/post-list-page';
import SignupPage from './pages/signup-page';

/**
 * App 컴포넌트
 * DEVIGN 커뮤니티의 라우팅과 인증 컨텍스트를 구성한다.
 * GitHub Pages 새로고침 404 를 피하기 위해 HashRouter 를 사용한다.
 */
function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Box
          sx={ {
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.default',
          } }
        >
          <Routes>
            <Route path="/login" element={ <LoginPage /> } />
            <Route path="/signup" element={ <SignupPage /> } />
            <Route
              path="/posts"
              element={
                <RequireAuth>
                  <PostListPage />
                </RequireAuth>
              }
            />
            <Route
              path="/posts/:postId"
              element={
                <RequireAuth>
                  <PostDetailPage />
                </RequireAuth>
              }
            />
            <Route path="*" element={ <Navigate to="/posts" replace /> } />
          </Routes>
        </Box>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
