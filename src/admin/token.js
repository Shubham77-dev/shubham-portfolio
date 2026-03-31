const TOKEN_KEY = 'admin_jwt';

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function base64UrlToBase64(str) {
  return str.replace(/-/g, '+').replace(/_/g, '/');
}

export function decodeJwt(token) {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const decoded = atob(base64UrlToBase64(payload));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function isAdminToken(token) {
  const decoded = decodeJwt(token);
  return decoded?.role === 'admin';
}

