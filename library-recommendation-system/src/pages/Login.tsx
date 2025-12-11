import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import { validateEmail, validateRequired } from '@/utils/validation';
import { handleApiError } from '@/utils/errorHandling';

/**
 * Login page component
 */
export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!validateRequired(email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!validateRequired(password)) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 animated-bg">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            <span className="gradient-text">Welcome Back</span>
          </h1>
          <p className="text-slate-600 text-lg">Sign in to your account to continue</p>
        </div>

        <div className="glass-effect rounded-3xl shadow-2xl border border-white/20 p-8">
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
              placeholder="you@example.com"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
              placeholder="••••••••"
            />

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="mr-2 w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-900 font-medium">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-violet-600 hover:text-violet-700 font-semibold"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-violet-600 hover:text-violet-700 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
