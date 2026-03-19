import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';

/**
 * App — Root application shell.
 *
 * Wraps all pages with a top-level ErrorBoundary so any unhandled render
 * errors are caught gracefully instead of crashing the whole app.
 */
function App() {
  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  );
}

export default App;
