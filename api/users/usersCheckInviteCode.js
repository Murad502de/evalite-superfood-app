import { api } from '@/api';

export const usersCheckInviteCode = async (code = null) => {
  if (!code) return;

  try {
    const response = await api.get(`users/check/invite-code/${code}`);
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
