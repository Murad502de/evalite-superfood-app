import { setUserVerificationStatus } from '@/Interactors/setUserVerificationStatus';
import { fetchUserDetail } from '@/Interactors/fetchUserDetail';
import * as verificationStatuses from '@/shared/verificationStatuses.js';

export const approvePartner = async ({ data, component, store, }) => {
  await setUserVerificationStatus({ uuid: data.uuid, status: verificationStatuses.verified });
  const user = await fetchUserDetail(data.uuid);
  return user;
};
