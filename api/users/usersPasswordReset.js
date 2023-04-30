import { api } from '@/api';

export const usersPasswordReset = async (email = null) => {
  if (!email) return;

  const payload = {
    email,
  };

  console.debug('api/users/usersPasswordReset.js/usersPasswordReset/payload', payload); //DELETE

  try {
    const response = await api.post('users/password/reset', payload);

    console.debug('api/users/usersPasswordReset.js/usersPasswordReset/response', response); //DELETE

    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
