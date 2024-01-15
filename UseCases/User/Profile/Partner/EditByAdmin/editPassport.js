import { getObjectKeysCount } from '@/utils/object';
import { updateUserProfilePassport } from '@/Interactors/updateUserProfilePassport';
import { fetchUserDetail } from '@/Interactors/fetchUserDetail';

export const editPassport = async ({ data, component, store, }) => {
  const mustUpdate = getObjectKeysCount({ object: data, except: ['uuid'], }).length;
  if (!mustUpdate) return;
  await updateUserProfilePassport(data);
  const user = await fetchUserDetail(data.uuid);
  return user;
};