// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { authService } from '../services';
import { AuthCredentials, SignUpData, AuthSession } from '../types';

export function useAuth() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const restoreSession = async () => {
      const response = await authService.getSession();
      if (response.success && response.data) {
        setSession(response.data);
      }
      setLoading(false);
    };

    restoreSession();

    const { data: { subscription } } = authService.onAuthStateChange((newSession) => {
      setSession(newSession);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (credentials: AuthCredentials) => {
    setLoading(true);
    setError(null);
    const response = await authService.signIn(credentials);
    if (!response.success) {
      setError(response.error);
    }
    setLoading(false);
    return response;
  };

  const signUp = async (data: SignUpData) => {
    setLoading(true);
    setError(null);
    const response = await authService.signUp(data);
    if (!response.success) {
      setError(response.error);
    }
    setLoading(false);
    return response;
  };

  const signOut = async () => {
    setLoading(true);
    const response = await authService.signOut();
    if (response.success) {
      setSession(null);
    }
    setLoading(false);
    return response;
  };

  const clearError = () => setError(null);

  return {
    session,
    loading,
    error,
    isAuthenticated: !!session,
    signIn,
    signUp,
    signOut,
    clearError,
  };
}
