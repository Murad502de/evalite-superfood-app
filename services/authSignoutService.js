import Cookies from 'js-cookie';

export const authSignoutService = async () => {
  Cookies.set('token', '');
  Cookies.set('uuid', '');
  return true;
};
