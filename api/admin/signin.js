import { api } from '@/api';

export const signin = async (email = null, password = null) => {
  if (!email || !password) return;

  const payload = {
    email,
    password,
  };

  console.debug('api/users/signin.js/signin/payload', payload); //DELETE

  try {
    const response = await api.post('admin/signin', payload);

    console.debug('api/users/signin.js/signin/response', response); //DELETE

    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
