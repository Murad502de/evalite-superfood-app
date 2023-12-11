import { updateUser } from '@/services/userService';

export const updateUserProfileContract = async (data = null) => {
  console.debug('updateUserProfileContract/data', data); //DELETE
  if (!data) return;
  const updateUserResponse = await updateUser(data);
  console.debug('updateUserResponse', updateUserResponse); //DELETE

  if (updateUserResponse.status !== 200) {
    alert('Ошибка сохранения настроек паспорта пользователя'); //FIXME implement with vuetify
  }
}
