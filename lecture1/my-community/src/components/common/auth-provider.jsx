import { useCallback, useEffect, useMemo, useState } from 'react';

import { AuthContext } from '../../hooks/auth-context';
import { signInAsGuestUser, signInUser, signUpUser } from '../../lib/auth-api';

/** 로그인 정보를 보관할 localStorage 키 */
const STORAGE_KEY = 'devign.user';

/**
 * AuthProvider 컴포넌트
 * 로그인 사용자 상태를 관리하고 하위 트리에 인증 액션을 제공한다.
 *
 * Props:
 * @param {node} children - 컨텍스트를 사용할 하위 요소 [Required]
 *
 * Example usage:
 * <AuthProvider><App /></AuthProvider>
 */
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (stored) setUser(JSON.parse(stored));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    setIsLoading(false);
  }, []);

  /** 로그인 성공 후 상태와 저장소를 동시에 갱신한다. */
  const applyUser = useCallback((nextUser) => {
    setUser(nextUser);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));

    return nextUser;
  }, []);

  const signIn = useCallback(
    async (credentials) => applyUser(await signInUser(credentials)),
    [applyUser],
  );

  const signInAsGuest = useCallback(
    async () => applyUser(await signInAsGuestUser()),
    [applyUser],
  );

  const signUp = useCallback(
    async (payload) => applyUser(await signUpUser(payload)),
    [applyUser],
  );

  const signOut = useCallback(() => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, signIn, signInAsGuest, signUp, signOut }),
    [user, isLoading, signIn, signInAsGuest, signUp, signOut],
  );

  return <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>;
}

export default AuthProvider;
