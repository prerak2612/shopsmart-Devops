import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleApiError } from '../../helpers/api';

describe('handleApiError', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should return an error object with the error message', () => {
    const error = new Error('Network failure');
    const result = handleApiError(error);
    expect(result).toEqual({ error: true, message: 'Network failure' });
  });

  it('should log the error message to console.error', () => {
    const error = new Error('Server error');
    handleApiError(error);
    expect(console.error).toHaveBeenCalledWith('API Error:', 'Server error');
  });

  it('should handle errors with no message', () => {
    const result = handleApiError({});
    expect(result).toEqual({
      error: true,
      message: 'An unknown error occurred',
    });
  });

  it('should handle null/undefined errors', () => {
    const result = handleApiError(null);
    expect(result).toEqual({
      error: true,
      message: 'An unknown error occurred',
    });
  });
});
