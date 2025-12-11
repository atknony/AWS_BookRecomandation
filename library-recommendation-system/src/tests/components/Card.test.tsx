import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '@/components/common/Card';

describe('Card Component', () => {
  it('renders children content', () => {
    render(
      <Card>
        <h3>Card Title</h3>
        <p>Card content</p>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('calls onClick when hoverable card is clicked', () => {
    const handleClick = vi.fn();
    render(
      <Card hoverable onClick={handleClick}>
        Click me
      </Card>
    );

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies hover classes when hoverable prop is true', () => {
    const { container } = render(<Card hoverable>Hoverable</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('hover:shadow-lg');
  });
});
