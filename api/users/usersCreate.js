import { api } from '@/api';
import { userSignupDomain } from '@/domain/userSignupDomain';

export const usersCreate = async (payload = userSignupDomain) => {
  console.debug('api/users/usersCreate.js/usersCreate/payload', payload); //DELETE

  try {
    const response = await api.post('users', payload);

    console.debug('api/users/usersCreate.js/usersCreate/response', response); //DELETE

    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
