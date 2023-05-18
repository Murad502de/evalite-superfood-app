export const parseFromISOtoDdMmYyyy = (value = null) => {
  if (!value) return '';
  const day = new Date(Date.parse(value)).getDate();
  const month = new Date(Date.parse(value)).getMonth() + 1;
  const year = new Date(Date.parse(value)).getFullYear();
  return `${addZeroConditional(day)}.${addZeroConditional(month)}.${year}`;
};

const addZeroConditional = (value = null) => {
  if (!value) return '';
  return value < 10 ? '0' + value : value;
};
