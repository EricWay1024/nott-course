import { request, parseObjCols } from './common';

const courseObjCols = [
  'convenor',
  'requisites',
  'additionalRequirements',
  'courseWebLinks',
  'class',
  'assessment',
  'belongsTo',
];

export const getCourse = async (code) => {
  const course = await request(`/api/course?code=${code}`);
  return parseObjCols(course, courseObjCols);
};

export const queryCourses = async (query) => request('/api/query/course', 'POST', query);
