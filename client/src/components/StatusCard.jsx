import { formatTimestamp, formatStatus } from '../helpers/formatters';

function StatusCard({ status, message, timestamp }) {
  return (
    <div className="card" data-testid="status-card">
      <h2>Backend Status</h2>
      {status ? (
        <div>
          <p>
            Status: <span className="status-ok" data-testid="status-text">{formatStatus(status)}</span>
          </p>
          {message && <p data-testid="message-text">Message: {message}</p>}
          {timestamp && (
            <p data-testid="timestamp-text">Timestamp: {formatTimestamp(timestamp)}</p>
          )}
        </div>
      ) : (
        <p data-testid="no-status">No status available</p>
      )}
    </div>
  );
}

export default StatusCard;
