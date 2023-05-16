import { api } from '@/api';

export const configurationsRead = async () => {
  try {
    const response = await api.get('configurations');
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
