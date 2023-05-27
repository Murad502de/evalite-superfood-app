import { api } from '@/api';

export const payoutsUuidPayout = async ({ uuid }) => {
  try {
    const response = await api.put(`payouts/${uuid}/payout`);
    return response;
  } catch (e) {
    console.error(e);
    return Object.assign({}, e).response;
  }
};
