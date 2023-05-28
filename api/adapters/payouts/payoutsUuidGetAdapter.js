import { parseFromISOtoDdMmYyyy } from '@/utils/date';
import { userUuidInAdapter } from '@/api/adapters/users/userUuidInAdapter';

export const payoutsUuidGetAdapter = async (payout) => {
  return {
    uuid: payout.uuid,
    date: parseFromISOtoDdMmYyyy(payout.created_at),
    price: payout.price,
    user: await userUuidInAdapter(payout.user),
  };
};
