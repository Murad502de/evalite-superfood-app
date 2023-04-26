import Cookies from 'js-cookie';
import { signin } from '@/api/admin/signin';

export const authSigninService = async (email, password,) => {
  console.debug('services/authSigninService.js/authSigninService/email', email); //DELETE
  console.debug('services/authSigninService.js/authSigninService/password', password); //DELETE
  const response = await signin(email, password);
  console.debug('services/authSigninService.js/authSigninService/response', response); //DELETE

  if (response.status === 200) {
    Cookies.set('token', response.data.token);
  }

  return response;
};
