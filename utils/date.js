export const parseFromISOtoDdMmYyyy = (value = null) => {
  if (!value) return '';
  const day = new Date(Date.parse(value)).getDate();
  const month = new Date(Date.parse(value)).getMonth() + 1;
  const year = new Date(Date.parse(value)).getFullYear();
  return `${addZeroConditional(day)}.${addZeroConditional(month)}.${year}`;
};

export const parseFromDatePickerDdMmYyyy = (value = null) => {
  if (!value) return '';
  const splited = value.split('-');
  const day = splited[2];
  const month = splited[1];
  const year = splited[0];
  return `${day}.${month}.${year}`;
};

const addZeroConditional = (value = null) => {
  if (!value) return '';
  return value < 10 ? '0' + value : value;
};
