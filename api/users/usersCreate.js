import { api } from '@/api';
import { userSignupDomain } from '@/domain/userSignupDomain';

export const usersCreate = async (payload = userSignupDomain) => {
  console.debug('api/users/usersCreate.js/usersCreate/payload', payload); //DELETE

  const data = new FormData();

  Object.keys(payload).forEach(key => {
    data.append(key, payload[key]);
  });

  console.debug('api/users/usersCreate.js/usersCreate/data', data); //DELETE

  try {
    const response = await api.post('users', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.debug('api/users/usersCreate.js/usersCreate/response', response); //DELETE

    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
