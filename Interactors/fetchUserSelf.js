import { fetchUserMy } from '@/services/userService';

export const fetchUserSelf = async ({ store, }) => {
  console.debug('fetchUserSelf'); //DELETE
  const user = await fetchUserMy();
  console.debug('fetchUserSelf/user', user); //DELETE

  if (!user) {
    alert('Ошибка получения пользователя'); //FIXME implement with vuetify
    return;
  }

  store.dispatch('userStore/setUserData', user);
};
