import { api } from '@/api';

export const payoutsUuidPayout = async ({ uuid, receiptFile }) => {
  if (!uuid || !receiptFile) return;
  const data = new FormData();
  data.append('payout_receipt', receiptFile);

  try {
    const response = await api.post(`payouts/${uuid}/payout`, data, {
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
