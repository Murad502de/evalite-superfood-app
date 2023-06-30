import { api } from '@/api';

export const payoutsGet = async ({
  page,
  perPage,
  filterStatus,
}) => {
  try {
    const params = {
      page,
      per_page: perPage,
      filter_status: filterStatus,
    };
    const response = await api.get('payouts', {
      params,
    });
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
