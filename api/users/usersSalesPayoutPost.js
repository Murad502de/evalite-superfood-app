import { api } from '@/api';

export const usersSalesPayoutPost = async () => {
  try {
    const response = await api.post('users/sales/payout');
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
