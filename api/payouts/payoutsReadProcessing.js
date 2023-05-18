import { api } from '@/api';

export const payoutsReadProcessing = async ({ page, perPage, }) => {
  try {
    const params = {
      page,
      per_page: perPage,
      filter_status: 'processing',
    };
    const response = await api.get('payouts', {
      params,
    });
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
