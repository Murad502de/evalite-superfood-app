import { api } from '@/api';

export const usersPayoutsGet = async ({
  page,
  perPage,
  orderBy,
  orderingRule,
  filterDateFrom,
  filterDateTo,
  filterStatus,
}) => {
  try {
    const params = {
      page,
      per_page: perPage,
      order_by: orderBy,
      ordering_rule: orderingRule,
      filter_date_from: filterDateFrom,
      filter_date_to: filterDateTo,
      filter_status: filterStatus,
    };
    const response = await api.get('users/payouts', {
      params,
    });
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
