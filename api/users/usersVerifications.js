import { api } from '@/api';

export const usersVerifications = async () => {
  try {
    const params = {
      filter_status: 'waiting',
    };
    const response = await api.get('users', {
      params,
    });
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
