/**
 * services/api.js — Public API service layer for the ShopSmart frontend.
 *
 * This module re-exports the core API helpers so that all components and
 * pages import from `services/api` rather than the lower-level helpers
 * directory. This keeps the import surface clean and easy to swap out.
 */
export { fetchHealthCheck, handleApiError } from '../helpers/api';
