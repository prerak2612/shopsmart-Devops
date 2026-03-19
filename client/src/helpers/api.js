/**
 * Fetch health check data from the backend API.
 * @param {string} apiUrl - Base API URL
 * @returns {Promise<object>} Health check data
 */
export async function fetchHealthCheck(apiUrl = '') {
  const response = await fetch(`${apiUrl}/api/health`);
  if (!response.ok) {
    throw new Error(`Health check failed with status ${response.status}`);
  }
  return response.json();
}

/**
 * Standard API error handler — logs error and returns a normalized error object.
 * @param {Error} error
 * @returns {{ error: boolean, message: string }}
 */
export function handleApiError(error) {
  const message = error?.message || 'An unknown error occurred';
  console.error('API Error:', message);
  return { error: true, message };
}
