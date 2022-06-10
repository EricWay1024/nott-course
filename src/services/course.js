import { request } from './common';

export const getCourse = async (code) => request(`/api/course?code=${code}`);

export const getCourseList = async () => request('/api/course');

export const getSchoolList = async () => request('/api/school');
