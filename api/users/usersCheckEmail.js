import { api } from '@/api';

export const usersCheckEmail = async (email = null) => {
  if (!email) return;

  try {
    const response = await api.get(`users/check/email/${email}`);
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
