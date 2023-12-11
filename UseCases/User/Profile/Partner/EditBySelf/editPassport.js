import { getObjectKeysCount } from '@/utils/object';
import { warnVerification } from '@/helpers/verificationHelper';
import { updateUserProfilePassport } from '@/Interactors/updateUserProfilePassport';
import { setUserVerificationStatus } from '@/Interactors/setUserVerificationStatus';
import { fetchUserSelf } from '@/Interactors/fetchUserSelf';

export const editPassport = async ({ data, component, store, }) => {
  const mustUpdate = getObjectKeysCount({ object: data, except: ['uuid'], }).length;
  if (!mustUpdate) return;
  if (!warnVerification()) return;
  await updateUserProfilePassport(data);
  await setUserVerificationStatus({ uuid: data.uuid, status: 'not_verified' });
  await fetchUserSelf({ store, });
};
