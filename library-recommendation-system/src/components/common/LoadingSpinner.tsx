/**
 * LoadingSpinner component props
 */
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

/**
 * Reusable LoadingSpinner component with size variants
 *
 * @example
 * <LoadingSpinner size="md" color="text-primary-600" />
 */
export function LoadingSpinner({ size = 'md', color = 'text-primary-600' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} ${color} animate-spin rounded-full border-4 border-gray-200 border-t-current`}
      />
    </div>
  );
}
