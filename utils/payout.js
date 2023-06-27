import * as payoutStatuses from '@/shared/payoutStatuses';

export const getPayoutStatusByName = (name = null) => {
  switch (name) {
    case 'в обработке':
      return payoutStatuses.processing;
    case 'выплачено':
      return payoutStatuses.completed;
    default:
      return null;
  }
};
