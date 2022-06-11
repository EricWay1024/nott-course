export const baseUrl = 'https://mongo-realm-worker.ericway1024.workers.dev';
// export const baseUrl = 'http://localhost:8787';
export const apiKey = 'B92PR3A2rwy5VQJgKjXxSffzDgjSZjthHghIXK1HGnZ6aYbUgGzdSX8jT4WS23M2';

const headers = {
  authorization: `${apiKey}`,
  'Content-Type': 'application/json',
};

export const request = async (url, method = 'GET', data = {}) => {
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
