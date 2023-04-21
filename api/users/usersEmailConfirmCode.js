import { api } from '@/api';

export const usersEmailConfirmCode = async (email = null) => {
  if (!email) return;

  const payload = { email };

  console.debug('api/users/usersEmailConfirmCode.js/usersEmailConfirmCode/payload', payload); //DELETE

  try {
    const response = await api.post('users/email/confirm/code', payload);

    console.debug('api/users/usersEmailConfirmCode.js/usersEmailConfirmCode/response', response); //DELETE

    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
