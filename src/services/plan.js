import { request, parseObjCols } from './common';

const planObjCols = [
  'school',
  'planAccreditation',
  'subjectBenchmark',
  'modules',
  'courseWeightings',
  'degreeCalculationModel',
];

export const getPlan = async (code) => {
  const plan = await request(`/api/plan?code=${code}`);
  return parseObjCols(plan, planObjCols);
};

export const getPlanList = async () => request('/api/plan');
