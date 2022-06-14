import request from './common';

export const getCourse = async (code) => request(`/api/course?code=${code}`);

export const queryCourses = async (query) => request('/api/query/course', 'POST', query);
