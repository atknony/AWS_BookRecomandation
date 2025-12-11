import React from 'react';

/**
 * Button component props
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'gradient' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * Modern Button component with beautiful gradients and animations
 *
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click Me
 * </Button>
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    'rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 focus:ring-violet-500/20',
    secondary:
      'bg-white text-slate-700 hover:bg-slate-50 shadow-md hover:shadow-lg border-2 border-slate-200 hover:border-violet-300 focus:ring-violet-500/20',
    danger:
      'bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:from-rose-700 hover:to-pink-700 shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 focus:ring-rose-500/20',
    gradient:
      'bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 text-white hover:from-orange-600 hover:via-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 focus:ring-pink-500/20',
    outline:
      'bg-transparent text-violet-600 hover:bg-violet-50 border-2 border-violet-600 hover:border-violet-700 focus:ring-violet-500/20',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
