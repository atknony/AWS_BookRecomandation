import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';

/**
 * 404 Not Found page
 */
export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <div className="animate-bounce mt-4">
            <svg
              className="w-24 h-24 text-slate-400 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Page Not Found</h2>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off into the library stacks.
          Let's get you back on track.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
