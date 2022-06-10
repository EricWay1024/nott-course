import { request } from "./common";

export const getPlan = async (code) => (await request(`/api/plan?code=${code}`));

export const getPlanList = async () => {
    return await request(`/api/plan`);
}
