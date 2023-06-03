import { api } from '@/api';

export const usersPayoutsGet = async ({ page, perPage, }) => {
  try {
    const params = {
      page,
      per_page: perPage,
    };
    const response = await api.get('users/payouts', {
      params,
    });
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};