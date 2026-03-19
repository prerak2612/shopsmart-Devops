/**
 * Format an ISO timestamp to a human-readable string.
 * @param {string} isoString - ISO 8601 timestamp
 * @returns {string} Formatted date string
 */
export function formatTimestamp(isoString) {
  if (!isoString) return 'N/A';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return 'Invalid Date';
  }
}

/**
 * Capitalize and normalize a status string.
 * @param {string} status - Raw status string (e.g. "ok", "error")
 * @returns {string} Normalized status
 */
export function formatStatus(status) {
  if (!status || typeof status !== 'string') return 'Unknown';
  const normalized = status.trim().toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

/**
 * Truncate text to a maximum length, adding ellipsis if needed.
 * @param {string} text - The text to truncate
 * @param {number} maxLen - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLen = 50) {
  if (!text || typeof text !== 'string') return '';
  if (maxLen < 0) return '';
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen) + '...';
}

/**
 * Format a number as USD currency.
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
