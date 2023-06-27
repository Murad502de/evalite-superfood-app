import { api } from '@/api';

export const usersSalesBonussesGet = async ({
  page,
  perPage,
  orderBy,
  orderingRule,
  filterDateFrom,
  filterDateTo,
  filterLeadName,
  filterPartnerName,
  filterStatus,
  filterLevel,
}) => {
  try {
    const params = {
      page,
      per_page: perPage,
      order_by: orderBy,
      ordering_rule: orderingRule,
      filter_date_from: filterDateFrom,
      filter_date_to: filterDateTo,
      filter_level: filterLevel,
      filter_status: filterStatus,
      filter_lead_name: filterLeadName,
      filter_partner_name: filterPartnerName,
    };
    const response = await api.get('users/sales/bonusses', {
      params,
    });
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
