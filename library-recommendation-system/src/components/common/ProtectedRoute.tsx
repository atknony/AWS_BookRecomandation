import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from './LoadingSpinner';

/**
 * ProtectedRoute component props
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

/**
 * ProtectedRoute component wraps routes that require authentication
 *
 * @example
 * <Route path="/admin" element={
 *   <ProtectedRoute requireAdmin>
 *     <AdminPage />
 *   </ProtectedRoute>
 * } />
 */
export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
