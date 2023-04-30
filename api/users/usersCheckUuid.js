import { api } from '@/api';

export const usersCheckUuid = async (uuid = null) => {
  if (!uuid) return;

  try {
    const response = await api.get(`users/check/uuid/${uuid}`);
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
