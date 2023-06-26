import * as saleStatuses from '@/shared/saleStatuses';

export const getSaleStatusByName = (name = null) => {
  switch (name) {
    case 'не выплачено':
      return saleStatuses.waiting;
    case 'в обработке':
      return saleStatuses.processing;
    case 'выплачено':
      return saleStatuses.closed;
    default:
      return null;
  }
};
