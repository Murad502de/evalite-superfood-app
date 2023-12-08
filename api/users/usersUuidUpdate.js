import { api } from '@/api';

export const usersUuidUpdate = async (payload = null) => {
  if (payload === null) return;
  const data = new FormData();
  Object.keys(payload).forEach(key => {
    if (!!payload[key]) {
      data.append(key, payload[key]);
    }
  });

  try {
    const response = await api.post(`users/${payload.uuid}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response;
  } catch (e) {
    console.error(e);
    return Object.assign({}, e).response;
  }
};
