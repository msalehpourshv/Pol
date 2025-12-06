import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AuthenticatedUser,
  configureAuth,
  getAccessToken,
  getUser,
  isAuthenticated,
  login,
  logout,
} from '@pol/auth-core';

interface AuthContextValue {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  login: (redirectPath?: string) => void;
  logout: () => void;
  getAccessToken: typeof getAccessToken;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(getUser());
  const [authed, setAuthed] = useState<boolean>(isAuthenticated());

  useEffect(() => {
    setUser(getUser());
    setAuthed(isAuthenticated());
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: authed,
    login: (redirectPath?: string) => {
      login(redirectPath);
      setUser(getUser());
      setAuthed(true);
    },
    logout: () => {
      logout();
      setUser(null);
      setAuthed(false);
    },
    getAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}

export const RequireAuth: React.FC<React.PropsWithChildren<{ redirectTo?: string }>> = ({
  children,
  redirectTo = '/login',
}) => {
  const { isAuthenticated: authed, login } = useAuth();
  useEffect(() => {
    if (!authed) {
      login(redirectTo);
    }
  }, [authed, login, redirectTo]);

  if (!authed) return null;
  return <>{children}</>;
};

export { configureAuth };
