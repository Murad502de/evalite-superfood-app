import { api } from '@/api';

export const usersEmailConfirm = async (email = null, confirm_code = null) => {
  if (!email || !confirm_code) return;
  const payload = {
    email,
    confirm_code,
  };

  try {
    const response = await api.post('users/email/confirm', payload);
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
