import { getObjectKeysCount } from '@/utils/object';
import { updateUserProfilePaymentDetails } from '@/Interactors/updateUserProfilePaymentDetails';
import { fetchUserDetail } from '@/Interactors/fetchUserDetail';

export const editPaymentDetails = async ({ data, component, store, }) => {
  const mustUpdate = getObjectKeysCount({ object: data, except: ['uuid'], }).length;
  if (!mustUpdate) return;
  await updateUserProfilePaymentDetails(data);
  const user = await fetchUserDetail(data.uuid);
  return user;
};
