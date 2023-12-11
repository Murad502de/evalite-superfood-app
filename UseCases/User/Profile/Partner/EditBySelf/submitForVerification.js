import { setUserVerificationStatus } from '@/Interactors/setUserVerificationStatus';
import { fetchUserSelf } from '@/Interactors/fetchUserSelf';

export const submitForVerification = async ({ data, component, store, }) => {
  await setUserVerificationStatus({ uuid: data.uuid, status: 'waiting' });
  await fetchUserSelf({ store, });
};
