import { updateUser } from '@/services/userService';

export const updateUserProfilePaymentDetails = async (data = null) => {
  console.debug('updateUserProfilePaymentDetails/data', data); //DELETE
  if (!data) return;
  const updateUserResponse = await updateUser(data);
  console.debug('updateUserResponse', updateUserResponse); //DELETE

  if (updateUserResponse.status !== 200) {
    alert('Ошибка сохранения настроек платежной информации пользователя'); //FIXME implement with vuetify
  }
}
