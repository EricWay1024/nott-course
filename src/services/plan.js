import { request } from './common';

export const getPlan = async (code) => request(`/api/plan?code=${code}`);

export const getPlanList = async () => request('/api/plan');
