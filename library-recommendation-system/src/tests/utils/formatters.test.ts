import { describe, it, expect } from 'vitest';
import { formatDate, formatRating, truncateText } from '@/utils/formatters';

describe('Formatter Utilities', () => {
  describe('formatDate', () => {
    it('formats ISO date string correctly', () => {
      const result = formatDate('2024-01-15T10:00:00Z');
      expect(result).toBe('Jan 15, 2024');
    });
  });

  describe('formatRating', () => {
    it('formats rating to one decimal place', () => {
      expect(formatRating(4.567)).toBe('4.6');
      expect(formatRating(3)).toBe('3.0');
      expect(formatRating(4.1)).toBe('4.1');
    });
  });

  describe('truncateText', () => {
    it('returns original text if shorter than maxLength', () => {
      const text = 'Short text';
      expect(truncateText(text, 20)).toBe('Short text');
    });

    it('truncates text and adds ellipsis if longer than maxLength', () => {
      const text = 'This is a very long text that needs to be truncated';
      const result = truncateText(text, 20);
      expect(result).toBe('This is a very long...');
      expect(result.length).toBeLessThanOrEqual(23); // 20 chars + '...'
    });

    it('handles exact length match', () => {
      const text = 'Exactly twenty chars';
      expect(truncateText(text, 20)).toBe('Exactly twenty chars');
    });
  });
});
