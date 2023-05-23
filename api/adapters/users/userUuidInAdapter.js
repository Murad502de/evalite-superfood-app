import { parseFromISOtoDdMmYyyy } from '@/utils/date';

export const userUuidInAdapter = async (user) => ({
  uuid: user.uuid,
  avatar: user.avatar,
  fullName: `${user.second_name} ${user.first_name} ${user.third_name}`,
  firstName: user.first_name,
  secondName: user.second_name,
  thirdName: user.third_name,
  gender: user.gender,
  birthday: parseFromISOtoDdMmYyyy(user.birthday),
  email: user.email,
  phone: user.phone,
});
