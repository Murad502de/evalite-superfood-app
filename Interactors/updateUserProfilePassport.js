import { updateUser } from '@/services/userService';

export const updateUserProfilePassport = async (data = null) => {
  console.debug('updateUserProfilePassport/data', data); //DELETE
  if (!data) return;
  const updateUserResponse = await updateUser(data);
  console.debug('updateUserResponse', updateUserResponse); //DELETE

  if (updateUserResponse.status !== 200) {
    alert('Ошибка сохранения настроек паспорта пользователя'); //FIXME implement with vuetify
  }
}
