import { api } from '@/api';

export const usersUuidStatusVerificationSet = async (uuid = null, status = null) => {
  if (uuid === null || status === null) return;
  const payload = {
    'user_verification_status': status,
  };

  try {
    const response = await api.post(`users/${uuid}/status/verification`, payload);

    return response;
  } catch (e) {
    console.error(e);
    return Object.assign({}, e).response;
  }
};
