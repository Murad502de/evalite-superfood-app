export const usersSalesDirectsGetAdapter = async (data) => {
  return {
    uuid: data.uuid,
    name: data.name,
    percent: data.percent,
    price: data.price,
    status: data.status,
  };
};
