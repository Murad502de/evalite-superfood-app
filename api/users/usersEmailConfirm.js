import { api } from '@/api';

export const usersEmailConfirm = async (email = null, confirm_code = null) => {
  if (!email || !confirm_code) return;

  const payload = {
    email,
    confirm_code,
  };

  console.debug('api/users/usersEmailConfirm.js/usersEmailConfirm/payload', payload); //DELETE

  try {
    const response = await api.post('users/email/confirm', payload);

    console.debug('api/users/usersEmailConfirm.js/usersEmailConfirm/response', response); //DELETE

    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
