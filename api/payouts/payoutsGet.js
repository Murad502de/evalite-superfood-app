import { api } from '@/api';

export const payoutsGet = async ({
  page,
  perPage,
  orderBy,
  orderingRule,
  filterDateFrom,
  filterDateTo,
  filterPartnerEmail,
  filterPartnerFullName,
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
      filter_partner_email: filterPartnerEmail,
      filter_partner_full_name: filterPartnerFullName,
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
