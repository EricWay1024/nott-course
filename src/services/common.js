import { getLocalStorage } from '../utils/helper';

const request = async (url, method = 'GET', data = {}) => {
  const campus = getLocalStorage('campus', 'U');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: campus,
  };
  const baseUrl = import.meta.env.VITE_BASE_URL;
  try {
    const res = await fetch(
      `${baseUrl}${url}`,
      method === 'GET'
        ? { headers }
        : { headers, method, body: JSON.stringify(data) },
    );
    if (!res.ok) {
      // Surface HTTP errors instead of masking them as empty results.
      return { error: { status: res.status, message: `Request failed with status ${res.status}` } };
    }
    return await res.json();
  } catch (e) {
    // Network failure or invalid JSON: report it rather than swallowing.
    // eslint-disable-next-line no-console
    console.error(`Request to ${url} failed:`, e);
    return { error: { status: 0, message: e.message || 'Network error' } };
  }
};

export default request;
