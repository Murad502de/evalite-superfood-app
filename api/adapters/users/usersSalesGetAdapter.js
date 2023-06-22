import { parseFromISOtoDdMmYyyy } from '@/utils/date';

export const usersSalesGetAdapter = async (data) => {
  return {
    uuid: data.uuid,
    date: parseFromISOtoDdMmYyyy(data.created_at),
    name: data.name,
    percent: data.percent,
    price: data.price,
    status: data.status,
  };
};
