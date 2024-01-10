import { getObjectKeysCount } from '@/utils/object';
import { updateUserProfileContract } from '@/Interactors/updateUserProfileContract';
import { fetchUserDetail } from '@/Interactors/fetchUserDetail';

export const editContract = async ({ data, component, store, }) => {
  const mustUpdate = getObjectKeysCount({ object: data, except: ['uuid'], }).length;
  if (!mustUpdate) return;
  await updateUserProfileContract(data);
  const user = await fetchUserDetail(data.uuid);
  return user;
};
