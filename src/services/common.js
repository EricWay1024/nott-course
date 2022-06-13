export const baseUrl = 'https://nott-course.ericway.xyz';

const headers = {
  'Content-Type': 'application/json',
};

export const parseObjCols = (obj, cols) => {
  const newObj = obj;
  cols.forEach((col) => {
    if (obj[col]) {
      newObj[col] = JSON.parse(obj[col]);
    }
  });
  return newObj;
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
