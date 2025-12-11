import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

/**
 * Custom hook to access authentication context
 *
 * @throws Error if used outside AuthProvider
 * @returns Authentication context value
 *
 * @example
 * const { user, isAuthenticated, login, logout } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
