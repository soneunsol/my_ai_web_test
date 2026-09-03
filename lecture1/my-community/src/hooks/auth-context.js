import { createContext, useContext } from 'react';

/** 로그인 사용자 정보와 인증 액션을 담는 컨텍스트 */
export const AuthContext = createContext(null);

/**
 * 인증 컨텍스트 사용 훅
 *
 * @returns {{
 *   user: object|null,
 *   isLoading: boolean,
 *   signIn: function,
 *   signInAsGuest: function,
 *   signUp: function,
 *   signOut: function
 * }} 인증 상태와 액션
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth 는 AuthProvider 내부에서만 사용할 수 있습니다.');
  }

  return context;
}
