import { useState, useEffect } from 'react';
import StatusCard from '../components/StatusCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchHealthCheck, handleApiError } from '../services/api';

/**
 * HomePage — The main landing page of ShopSmart.
 *
 * Fetches the backend health-check on mount and displays the result
 * via reusable StatusCard / LoadingSpinner components.
 */
function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    fetchHealthCheck(apiUrl)
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        const apiError = handleApiError(err);
        setError(apiError.message);
        setLoading(false);
      });
  }, []);

  return (
    <main className="container" data-testid="home-page">
      <header>
        <h1>ShopSmart</h1>
        <p className="subtitle">Your smart shopping companion</p>
      </header>

      {loading && <LoadingSpinner message="Loading backend status..." />}

      {error && (
        <div className="card error-card" data-testid="error-display">
          <h2>⚠ Connection Error</h2>
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

      <section className="info-section">
        <div className="info-grid">
          <div className="info-card" data-testid="info-card-api">
            <span className="info-icon">🔌</span>
            <h3>API Connected</h3>
            <p>Backend is live and responding to health checks.</p>
          </div>
          <div className="info-card" data-testid="info-card-realtime">
            <span className="info-icon">⚡</span>
            <h3>Real-time Status</h3>
            <p>Monitoring backend availability on every page load.</p>
          </div>
          <div className="info-card" data-testid="info-card-ci">
            <span className="info-icon">🚀</span>
            <h3>CI/CD Powered</h3>
            <p>Deployed automatically via GitHub Actions on main.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
