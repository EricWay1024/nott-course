import request from './common';

const distinctBy = (data, key) => {
  if (!data) return data;
  const res = [];
  const keys = new Set();
  data.forEach((item) => {
    if (!keys.has(item[key])) {
      res.push(item);
      keys.add(item[key]);
    }
  });
  return res;
};

export const getPlan = async (code) => {
  const res = await request(`/api/plan?code=${code}`);
  if (res.error) return res;
  res.modules = distinctBy(res.modules, 'title')
    .map((year) => ({
      ...year,
      groups: distinctBy(year.groups, 'title')
        .map((group) => ({
          ...group,
          modules: distinctBy(group.modules, 'code'),
        })),
    }));
  return res;
};

export const queryPlans = async (query) => request('/api/query/plan', 'POST', query);
