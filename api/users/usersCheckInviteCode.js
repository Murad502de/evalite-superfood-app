import { api } from '@/api';

export const usersCheckInviteCode = async () => {
  const payload = {};

  console.debug('api/users/usersCheckInviteCode.js/usersCheckInviteCode/payload', payload); //DELETE

  try {
    const response = await api.post('users', payload);

    console.debug('api/users/usersCheckInviteCode.js/usersCheckInviteCode/response', response); //DELETE

    return response;
  } catch (e) {
    return Object.assign(error, e).response;
  }
};
