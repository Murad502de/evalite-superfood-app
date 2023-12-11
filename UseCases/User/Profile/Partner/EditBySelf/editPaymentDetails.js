import { getObjectKeysCount } from '@/utils/object';
import { warnVerification } from '@/helpers/verificationHelper';
import { updateUserProfilePaymentDetails } from '@/Interactors/updateUserProfilePaymentDetails';
import { setUserVerificationStatus } from '@/Interactors/setUserVerificationStatus';
import { fetchUserSelf } from '@/Interactors/fetchUserSelf';

export const editPaymentDetails = async ({ data, component, store, }) => {
  const mustUpdate = getObjectKeysCount({ object: data, except: ['uuid'], }).length;
  if (!mustUpdate) return;
  if (!warnVerification()) return;
  await updateUserProfilePaymentDetails(data);
  await setUserVerificationStatus({ uuid: data.uuid, status: 'not_verified' });
  await fetchUserSelf({ store, });
};
