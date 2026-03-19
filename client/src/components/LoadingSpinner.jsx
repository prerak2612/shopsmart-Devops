function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div
      className="loading-spinner"
      data-testid="loading-spinner"
      role="status"
    >
      <p>{message}</p>
    </div>
  );
}

export default LoadingSpinner;
