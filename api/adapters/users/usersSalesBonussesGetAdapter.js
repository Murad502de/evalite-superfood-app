import { parseFromISOtoDdMmYyyy } from '@/utils/date';

export const usersSalesBonussesGetAdapter = async (data) => {
  return {
    uuid: data.uuid,
    date: parseFromISOtoDdMmYyyy(data.created_at),
    name: data.name,
    percent: data.percent,
    price: data.price,
    status: data.status,
    partner: data.partner_name,
    level: data.level,
    init_price: data.init_price,
  };
};
