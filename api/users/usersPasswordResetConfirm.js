import { api } from '@/api';

export const usersPasswordResetConfirm = async (email = null, confirm_code = null) => {
  if (!email || !confirm_code) return;

  const payload = {
    email,
    confirm_code,
  };

  console.debug('api/users/usersPasswordResetConfirm.js/usersPasswordResetConfirm/payload', payload); //DELETE

  try {
    const response = await api.put('users/password/reset/confirm', payload);
    console.debug('api/users/usersPasswordResetConfirm.js/usersPasswordResetConfirm/response', response); //DELETE
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
