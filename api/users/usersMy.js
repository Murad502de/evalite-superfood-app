import { api } from '@/api';

export const usersMy = async () => {
  try {
    const response = await api.get(`users/my`);
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
