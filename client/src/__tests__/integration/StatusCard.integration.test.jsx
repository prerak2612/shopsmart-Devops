import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatusCard from '../../components/StatusCard';

describe('StatusCard Integration Tests', () => {
  it('should render all props correctly', () => {
    render(
      <StatusCard
        status="ok"
        message="Backend is running"
        timestamp="2024-01-15T10:30:00Z"
      />
    );

    expect(screen.getByTestId('status-text')).toHaveTextContent('Ok');
    expect(screen.getByTestId('message-text')).toHaveTextContent('Backend is running');
    expect(screen.getByTestId('timestamp-text')).toBeInTheDocument();
  });

  it('should handle missing optional props gracefully', () => {
    render(<StatusCard status="ok" />);

    expect(screen.getByTestId('status-text')).toHaveTextContent('Ok');
    expect(screen.queryByTestId('message-text')).not.toBeInTheDocument();
    expect(screen.queryByTestId('timestamp-text')).not.toBeInTheDocument();
  });

  it('should show "No status available" when status is undefined', () => {
    render(<StatusCard />);

    expect(screen.getByTestId('no-status')).toHaveTextContent('No status available');
  });
});
