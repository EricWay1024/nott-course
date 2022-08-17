import request from './common';
import { addKeys } from '../utils/helper';

export const getCourse = async (code) => request(`/api/course?code=${code}`);

export const queryCourses = async (query) => request('/api/query/course', 'POST', query);

export const getCourses = async (codes) => request('/api/courses', 'POST', { codes });

export const getCourseList = async (codes) => {
  if (!codes || codes.length === 0) return [];
  const res = await getCourses(codes);
  return addKeys(res);
};

export const getSolution = async (query) => request('/api/query/solve', 'POST', query);
