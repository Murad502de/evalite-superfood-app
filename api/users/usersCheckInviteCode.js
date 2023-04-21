import { api } from '@/api';

export const usersCheckInviteCode = async (code = null) => {
  console.debug('api/users/usersCheckInviteCode.js/usersCheckInviteCode/code', code); //DELETE

  if (!code) return;

  try {
    const response = await api.get(`users/check/invite-code/${code}`);

    console.debug('api/users/usersCheckInviteCode.js/usersCheckInviteCode/response', response); //DELETE

    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
