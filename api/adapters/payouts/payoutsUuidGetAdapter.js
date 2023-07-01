import { parseFromISOtoDdMmYyyy } from '@/utils/date';
import { userUuidInAdapter } from '@/api/adapters/users/userUuidInAdapter';

export const payoutsUuidGetAdapter = async (payout) => {
  return {
    uuid: payout.uuid,
    receiptUrl: payout.receipt_url,
    date: parseFromISOtoDdMmYyyy(payout.created_at),
    price: payout.price,
    status: payout.status,
    user: await userUuidInAdapter(payout.user),
  };
};
