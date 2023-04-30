import { api } from '@/api';

export const usersPasswordUpdate = async (email = null, confirm_code = null, password = null) => {
  if (!email || !confirm_code || !password) return;

  const payload = {
    email,
    confirm_code,
    password,
  };

  console.debug('api/users/usersPasswordUpdate.js/usersPasswordUpdate/payload', payload); //DELETE

  try {
    const response = await api.put('users/password', payload);
    console.debug('api/users/usersPasswordUpdate.js/usersPasswordUpdate/response', response); //DELETE
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
