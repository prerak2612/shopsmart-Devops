import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isNonEmpty,
  isValidUrl,
  isPositiveNumber,
} from '../../helpers/validators';

describe('isValidEmail', () => {
  it('should return true for a valid email address', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('test.user@domain.co')).toBe(true);
  });

  it('should return false for an invalid email address', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
    expect(isValidEmail('missing@')).toBe(false);
    expect(isValidEmail('@no-local.com')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });

  it('should return false for non-string input', () => {
    expect(isValidEmail(null)).toBe(false);
    expect(isValidEmail(undefined)).toBe(false);
    expect(isValidEmail(123)).toBe(false);
  });
});

describe('isNonEmpty', () => {
  it('should return true for non-empty strings', () => {
    expect(isNonEmpty('hello')).toBe(true);
    expect(isNonEmpty('  content  ')).toBe(true);
  });

  it('should return false for empty or whitespace-only strings', () => {
    expect(isNonEmpty('')).toBe(false);
    expect(isNonEmpty('   ')).toBe(false);
  });

  it('should return false for non-string input', () => {
    expect(isNonEmpty(null)).toBe(false);
    expect(isNonEmpty(0)).toBe(false);
  });
});

describe('isValidUrl', () => {
  it('should return true for valid URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://localhost:3000/path')).toBe(true);
  });

  it('should return false for invalid URLs', () => {
    expect(isValidUrl('not-a-url')).toBe(false);
    expect(isValidUrl('')).toBe(false);
    expect(isValidUrl(null)).toBe(false);
  });
});

describe('isPositiveNumber', () => {
  it('should return true for positive numbers', () => {
    expect(isPositiveNumber(1)).toBe(true);
    expect(isPositiveNumber(0.5)).toBe(true);
    expect(isPositiveNumber(100)).toBe(true);
  });

  it('should return false for zero, negative numbers, and non-numbers', () => {
    expect(isPositiveNumber(0)).toBe(false);
    expect(isPositiveNumber(-5)).toBe(false);
    expect(isPositiveNumber('10')).toBe(false);
    expect(isPositiveNumber(NaN)).toBe(false);
  });
});
