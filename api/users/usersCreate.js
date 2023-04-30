import { api } from '@/api';
import { userSignupDomain } from '@/domain/userSignupDomain';

export const usersCreate = async (payload = userSignupDomain) => {
  const data = new FormData();
  Object.keys(payload).forEach(key => {
    data.append(key, payload[key]);
  });

  try {
    const response = await api.post('users', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
