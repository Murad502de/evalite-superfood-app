import { updateUser } from '@/services/userService';

export const updateUserProfilePersonal = async (data = null) => {
  console.debug('updateUserProfilePersonal/data', data); //DELETE
  if (!data) return;
  const updateUserResponse = await updateUser(data);
  console.debug('updateUserResponse', updateUserResponse); //DELETE

  if (updateUserResponse.status !== 200) {
    alert('Ошибка сохранения пользователя'); //FIXME implement with vuetify
  }
}
