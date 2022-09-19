import { getLocalStorage } from '../utils/helper';

const request = async (url, method = 'GET', data = {}) => {
  const campus = getLocalStorage('campus', 'U');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: campus,
  };
  const baseUrl = process.env.REACT_APP_BASE_URL;
  try {
    const res = await fetch(
      `${baseUrl}${url}`,
      method === 'GET'
        ? { headers }
        : { headers, method, body: JSON.stringify(data) },
    ).then((r) => r.json());
    return res;
  } catch (e) {
    // console.error(e);
    return {};
  }
};

export default request;
