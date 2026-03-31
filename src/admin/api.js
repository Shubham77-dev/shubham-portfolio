import { getAdminToken } from './token';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

/**
 * Central fetch wrapper for all admin API calls.
 *
 * - Automatically attaches the JWT from localStorage if no explicit
 *   `token` is passed.  This prevents stale-token bugs when the token
 *   prop hasn't re-propagated yet.
 * - Throws a descriptive Error on non-2xx responses so callers can
 *   catch and surface the message directly.
 */
export async function apiFetch(path, { method = 'GET', token, body } = {}) {
  // Auto-read from localStorage when no explicit token is supplied.
  const resolvedToken = token ?? getAdminToken();

  const headers = { 'Content-Type': 'application/json' };
  if (resolvedToken) {
    headers.Authorization = `Bearer ${resolvedToken}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.message || data?.error || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}