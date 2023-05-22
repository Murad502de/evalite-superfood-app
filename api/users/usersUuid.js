import { api } from '@/api';

export const usersUuid = async (uuid = null) => {
  if (!uuid) return;

  try {
    const response = await api.get(`users/${uuid}`);
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
