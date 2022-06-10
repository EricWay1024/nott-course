import { request } from './common';

export const getCourse = async (code) => request(`/api/course?code=${code}`);

export const getCourseList = async (offering) => request(`/api/course?school=${offering}`);

export const getSchoolList = async () => request('/api/school');
