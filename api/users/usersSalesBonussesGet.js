import { api } from '@/api';

export const usersSalesBonussesGet = async ({ page, perPage, orderBy, orderingRule, }) => {
  try {
    const params = {
      page,
      per_page: perPage,
      order_by: orderBy,
      ordering_rule: orderingRule,
    };
    const response = await api.get('users/sales/bonusses', {
      params,
    });
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
