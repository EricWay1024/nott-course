import { request } from "./common";

export const getCourse = async (code) => (await request(`/api/course?code=${code}`));

export const getCourseList = async (offering) => {
    return await request(`/api/course?school=${offering}`);
}

export const getSchoolList = async () => {
    return await request(`/api/school`);
}