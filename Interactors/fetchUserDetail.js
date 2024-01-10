import { fetchUser } from '@/services/userService';

export const fetchUserDetail = async (uuid = null) => {
  console.debug('fetchUserDetail/uuid', uuid); //DELETE
  if (!uuid) return;
  const user = await fetchUser(uuid);
  console.debug('fetchUserDetail/user', user); //DELETE

  if (!user) {
    alert('Ошибка получения пользователя'); //FIXME implement with vuetify
    return;
  }

  return user;
};
