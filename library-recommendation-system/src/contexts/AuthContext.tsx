/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import { signIn, signUp, signOut, getCurrentUser, confirmSignUp, fetchUserAttributes } from 'aws-amplify/auth';
import { User } from '@/types';

/**
 * Authentication context type definition
 */
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  confirmSignup: (email: string, code: string) => Promise<void>;
}

/**
 * Authentication context
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component props
 */
interface AuthProviderProps {
  children: React.ReactNode;
}

// Admin information
const ADMIN_EMAILS = ['furkantahasaranda@gmail.com']; 

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to determine user role
  const getUserRole = (email: string): 'user' | 'admin' => {
    return ADMIN_EMAILS.includes(email.toLowerCase()) ? 'admin' : 'user';
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        const userEmail = attributes.email || user.signInDetails?.loginId || '';
        setUser({
          id: user.userId,
          email: userEmail,
          name: attributes.name || user.username,
          role: getUserRole(userEmail),
          createdAt: new Date().toISOString(),
        });
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { isSignedIn } = await signIn({ username: email, password });
      if (isSignedIn) {
        const user = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        const userEmail = attributes.email || email;
        setUser({
          id: user.userId,
          email: userEmail,
          name: attributes.name || user.username,
          role: getUserRole(userEmail),
          createdAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name,
          },
        },
      });
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const confirmSignup = async (email: string, code: string) => {
    setIsLoading(true);
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
    } catch (error) {
      console.error('Confirm signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup,
    confirmSignup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
