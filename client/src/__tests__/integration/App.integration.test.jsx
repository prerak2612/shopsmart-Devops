import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../../App';

describe('App Integration Tests', () => {
  const mockHealthData = {
    status: 'ok',
    message: 'ShopSmart Backend is running',
    timestamp: '2024-01-15T10:30:00Z',
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render and display fetched health data', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockHealthData),
      })
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('status-text')).toHaveTextContent('Ok');
    });
    expect(screen.getByTestId('message-text')).toHaveTextContent('ShopSmart Backend is running');
  });

  it('should show loading spinner before data arrives', () => {
    global.fetch = vi.fn(() => new Promise(() => {})); // never resolves

    render(<App />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText('Loading backend status...')).toBeInTheDocument();
  });

  it('should handle fetch error gracefully and show error message', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('error-display')).toBeInTheDocument();
    });
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('should call fetch with the correct API URL', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockHealthData),
      })
    );

    render(<App />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/health');
    });
  });

  it('should hide loading spinner after data is fetched', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockHealthData),
      })
    );

    render(<App />);

    // Initially loading
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    // After fetch resolves
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });
});
