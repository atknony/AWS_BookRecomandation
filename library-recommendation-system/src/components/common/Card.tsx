import React from 'react';

/**
 * Card component props
 */
interface CardProps {
  children: React.ReactNode;
  hoverable?: boolean;
  gradient?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Modern Card component with glass morphism and gradient effects
 *
 * @example
 * <Card hoverable gradient onClick={handleClick}>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </Card>
 */
export function Card({
  children,
  hoverable = false,
  gradient = false,
  onClick,
  className = '',
}: CardProps) {
  const baseClasses = gradient
    ? 'card-gradient'
    : 'bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-6';

  const hoverClasses = hoverable
    ? 'hover:shadow-2xl hover:-translate-y-1 hover:border-violet-300 transition-all duration-300 cursor-pointer hover-glow'
    : 'transition-all duration-300';

  const classes = `${baseClasses} ${hoverClasses} ${className}`;

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
}
