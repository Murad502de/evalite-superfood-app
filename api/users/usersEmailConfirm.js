import { api } from '@/api';

export const usersEmailConfirm = async () => {
  const payload = {};

  console.debug('api/users/usersEmailConfirm.js/usersEmailConfirm/payload', payload); //DELETE

  try {
    const response = await api.post('users/email/confirm', payload);

    console.debug('api/users/usersEmailConfirm.js/usersEmailConfirm/response', response); //DELETE

    return response;
  } catch (e) {
    return Object.assign(error, e).response;
  }
};
