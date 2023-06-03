import { api } from '@/api';

export const usersSalesDirectGet = async ({ page, perPage, }) => {
  try {
    const params = {
      page,
      per_page: perPage,
      filter_status: 'waiting',
    };
    const response = await api.get('users/sales/directs', {
      params,
    });
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
