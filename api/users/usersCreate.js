import { api } from '@/api';

export const usersCreate = async () => {
  const payload = {};

  console.debug('api/users/usersCreate.js/usersCreate/payload', payload); //DELETE

  try {
    const response = await api.post('users', payload);

    console.debug('api/users/usersCreate.js/usersCreate/response', response); //DELETE

    return response;
  } catch (e) {
    return Object.assign(error, e).response;
  }
};
