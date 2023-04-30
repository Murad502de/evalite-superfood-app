import { api } from '@/api';

export const usersPasswordReset = async (email = null) => {
  if (!email) return;
  const payload = {
    email,
  };

  try {
    const response = await api.post('users/password/reset', payload);
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
