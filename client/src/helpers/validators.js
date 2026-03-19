/**
 * Validate an email address format.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Check if a value is a non-empty string.
 * @param {*} val
 * @returns {boolean}
 */
export function isNonEmpty(val) {
  if (typeof val !== 'string') return false;
  return val.trim().length > 0;
}

/**
 * Validate a URL format.
 * @param {string} url
 * @returns {boolean}
 */
export function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a value is a positive number.
 * @param {*} n
 * @returns {boolean}
 */
export function isPositiveNumber(n) {
  return typeof n === 'number' && !isNaN(n) && n > 0;
}
