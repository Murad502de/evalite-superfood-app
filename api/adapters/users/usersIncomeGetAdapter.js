export const usersIncomeGetAdapter = async (data) => {
  return {
    amountThreshold: data.min_payout,
    amount: data.total_price,
  };
};
