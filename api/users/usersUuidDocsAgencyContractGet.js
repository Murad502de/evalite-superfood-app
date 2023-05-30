import { api } from '@/api';

export const usersUuidDocsAgencyContractGet = async (uuid = null) => {
  if (!uuid) return;

  try {
    const response = await api.get(`users/${uuid}/docs/agency-contract`, {
      responseType: 'blob',
    });
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
