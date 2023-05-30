import { api } from '@/api';

export const usersUuidDocsAgencyContractAdd = async (uuid = null, contract = null) => {
  if (!uuid || !contract) return;
  const data = new FormData();
  data.append('agency_contract', contract);

  try {
    const response = await api.post(`users/${uuid}/docs/agency-contract`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
