import { usersUuidUpdate } from '@/api/users/usersUuidUpdate';
import { userUuidOutAdapter } from '@/api/adapters/users/userUuidOutAdapter';

export const updateUserPersonal = async (data = null) => {
  console.debug('updateUserPersonal/data', data); //DELETE
  if (!data) return;

  const usersUuidUpdateResponse = await usersUuidUpdate(
    await userUuidOutAdapter(data)
  );

  console.debug('usersUuidUpdateResponse', usersUuidUpdateResponse); //DELETE

  if (usersUuidUpdateResponse.status !== 200) {
    alert('Ошибка сохранения пользователя'); //FIXME implement with vuetify
  }
}

export const updateUser = async (data = null) => {
  console.debug('updateUser/data', data); //DELETE
  if (!data) return;

  const usersUuidUpdateResponse = await usersUuidUpdate(
    await userUuidOutAdapter(data)
  );

  console.debug('usersUuidUpdateResponse', usersUuidUpdateResponse); //DELETE

  if (usersUuidUpdateResponse.status !== 200) {
    alert('Ошибка обновления данных пользователя'); //FIXME implement with vuetify
  }
}
