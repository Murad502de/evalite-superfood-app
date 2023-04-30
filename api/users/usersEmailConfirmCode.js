import { api } from '@/api';

export const usersEmailConfirmCode = async (email = null) => {
  if (!email) return;
  const payload = { email };

  try {
    const response = await api.post('users/email/confirm/code', payload);
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
