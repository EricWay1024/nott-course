export const baseUrl = 'https://mongo-realm-worker.ericway1024.workers.dev';
// export const baseUrl = 'http://localhost:8787'
export const apiKey = 'B92PR3A2rwy5VQJgKjXxSffzDgjSZjthHghIXK1HGnZ6aYbUgGzdSX8jT4WS23M2';

const headers = {
  authorization: `${apiKey}`,
  'Content-Type': 'application/json',
};

export const request = async (url) => {
  try {
    const res = await fetch(`${baseUrl}${url}`, { headers })
      .then((r) => r.json());
    return res;
  } catch (e) {
    // console.error(e);
    return {};
  }
};
