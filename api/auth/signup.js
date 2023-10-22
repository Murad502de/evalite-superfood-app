import { api } from '@/api';
import { userSignupDomain } from '@/domain/userSignupDomain';

export const signup = async (payload = userSignupDomain) => {
  const data = new FormData();
  Object.keys(payload).forEach(key => {
    data.append(key, payload[key]);
  });

  console.debug('signup/1234567890', data); //DELETE

  try {
    const response = await api.post('auth/signup', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
