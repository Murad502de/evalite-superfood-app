import { api } from '@/api';

export const usersPasswordUpdate = async (email = null, confirm_code = null, password = null) => {
  if (!email || !confirm_code || !password) return;
  const payload = {
    email,
    confirm_code,
    password,
  };

  try {
    const response = await api.put('users/password', payload);
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
