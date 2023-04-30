import { api } from '@/api';

export const usersCheckUuid = async (uuid = null) => {
  console.debug('api/users/usersCheckUuid.js/usersCheckUuid/uuid', uuid); //DELETE

  if (!uuid) return;

  try {
    const response = await api.get(`users/check/uuid/${uuid}`);

    console.debug('api/users/usersCheckUuid.js/usersCheckUuid/response', response); //DELETE

    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
