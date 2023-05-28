import { api } from '@/api';

export const payoutsUuidGet = async ({ uuid }) => {
  try {
    const response = await api.get(`payouts/${uuid}`);
    return response;
  } catch (e) {
    console.error(e);
    return Object.assign({}, e).response;
  }
};
