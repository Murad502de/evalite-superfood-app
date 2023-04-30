import { api } from '@/api';

export const usersCheckEmail = async (email = null) => {
  console.debug('api/users/usersCheckEmail.js/usersCheckEmail/email', email); //DELETE

  if (!email) return;

  try {
    const response = await api.get(`users/check/email/${email}`);

    console.debug('api/users/usersCheckEmail.js/usersCheckEmail/response', response); //DELETE

    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
