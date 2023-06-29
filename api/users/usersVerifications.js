import { api } from '@/api';

export const usersVerifications = async ({
  page,
  perPage,
  filterDateFrom,
  filterDateTo,
  filterEmail,
  filterName,
}) => {
  try {
    const params = {
      page,
      per_page: perPage,
      filter_status: 'waiting',
      filter_date_from: filterDateFrom,
      filter_date_to: filterDateTo,
      filter_email: filterEmail,
      filter_name: filterName,
    };
    const response = await api.get('users', {
      params,
    });
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
