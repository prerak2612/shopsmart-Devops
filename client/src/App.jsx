import { useState, useEffect } from 'react';
import StatusCard from './components/StatusCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { fetchHealthCheck, handleApiError } from './helpers/api';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    fetchHealthCheck(apiUrl)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        const apiError = handleApiError(err);
        setError(apiError.message);
        setLoading(false);
      });
  }, []);

  return (
    <ErrorBoundary>
      <div className="container">
        <h1>ShopSmart</h1>
        {loading && <LoadingSpinner message="Loading backend status..." />}
        {error && (
          <div className="card error-card" data-testid="error-display">
            <h2>Error</h2>
            <p>{error}</p>
          </div>
        )}
        {data && !loading && (
          <StatusCard
            status={data.status}
            message={data.message}
            timestamp={data.timestamp}
          />
        )}
        <p className="hint">
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </ErrorBoundary>
  );
}

export default App;
