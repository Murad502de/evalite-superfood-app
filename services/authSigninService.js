import Cookies from 'js-cookie';
import { signin } from '@/api/admin/signin';

export const authSigninService = async (email, password,) => {
  const response = await signin(email, password);

  if (response.status === 200) {
    Cookies.set('token', response.data.token);
    Cookies.set('uuid', response.data.uuid);
  }

  return response;
};
