import { setUserVerificationStatus } from '@/Interactors/setUserVerificationStatus';
import { fetchUserDetail } from '@/Interactors/fetchUserDetail';
import * as verificationStatuses from '@/shared/verificationStatuses.js';

export const rejectPartner = async ({ data, component, store, }) => {
  await setUserVerificationStatus({ uuid: data.uuid, status: verificationStatuses.rejected });
  const user = await fetchUserDetail(data.uuid);
  return user;
};
