import { describe, it, expect } from 'vitest';
import {
  formatTimestamp,
  formatStatus,
  truncateText,
  formatCurrency,
} from '../../helpers/formatters';

describe('formatTimestamp', () => {
  it('should format a valid ISO timestamp to a readable string', () => {
    const result = formatTimestamp('2024-01-15T10:30:00Z');
    expect(result).toContain('Jan');
    expect(result).toContain('2024');
  });

  it('should return "N/A" for empty or falsy input', () => {
    expect(formatTimestamp('')).toBe('N/A');
    expect(formatTimestamp(null)).toBe('N/A');
    expect(formatTimestamp(undefined)).toBe('N/A');
  });

  it('should return "Invalid Date" for malformed timestamps', () => {
    expect(formatTimestamp('not-a-date')).toBe('Invalid Date');
  });
});

describe('formatStatus', () => {
  it('should capitalize the first letter of a status string', () => {
    expect(formatStatus('ok')).toBe('Ok');
    expect(formatStatus('error')).toBe('Error');
    expect(formatStatus('running')).toBe('Running');
  });

  it('should return "Unknown" for empty or non-string input', () => {
    expect(formatStatus('')).toBe('Unknown');
    expect(formatStatus(null)).toBe('Unknown');
    expect(formatStatus(123)).toBe('Unknown');
  });
});

describe('truncateText', () => {
  it('should truncate text longer than maxLen and add ellipsis', () => {
    expect(truncateText('Hello World, this is a long text', 10)).toBe(
      'Hello Worl...'
    );
  });

  it('should return the original text if shorter than maxLen', () => {
    expect(truncateText('Short', 50)).toBe('Short');
  });

  it('should return empty string for non-string input', () => {
    expect(truncateText(null)).toBe('');
    expect(truncateText(undefined)).toBe('');
    expect(truncateText(123)).toBe('');
  });
});

describe('formatCurrency', () => {
  it('should format a positive number as USD currency', () => {
    expect(formatCurrency(29.99)).toBe('$29.99');
    expect(formatCurrency(1000)).toBe('$1,000.00');
  });

  it('should return "$0.00" for non-number input', () => {
    expect(formatCurrency('abc')).toBe('$0.00');
    expect(formatCurrency(NaN)).toBe('$0.00');
  });
});
