import { api } from '@/api';

export const usersSalesBonussesGet = async ({ page, perPage, }) => {
  try {
    const params = {
      page,
      per_page: perPage,
      // filter_status: 'waiting',
    };
    const response = await api.get('users/sales/bonusses', {
      params,
    });
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
