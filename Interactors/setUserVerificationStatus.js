// import { updateUser } from '@/services/userService';
import { usersUuidStatusVerificationSet } from '@/api/users/usersUuidStatusVerificationSet';

export const setUserVerificationStatus = async ({ uuid, status, }) => {
  console.debug('setUserVerificationStatus/uuid', uuid); //DELETE
  console.debug('setUserVerificationStatus/status', status); //DELETE
  if (!uuid || !status) return;

  const usersUuidStatusVerificationSetResponse = await usersUuidStatusVerificationSet(uuid, status);
  console.debug('usersUuidStatusVerificationSetResponse', usersUuidStatusVerificationSetResponse); //DELETE

  if (usersUuidStatusVerificationSetResponse.status !== 200) {
    alert('Ошибка изменения статуса верификации пользователя'); //FIXME implement with vuetify
  }

  // const updateUserResponse = await updateUser({
  //   uuid,
  //   verificationStatus: status,
  // });
  // console.debug('updateUserResponse', updateUserResponse); //DELETE

  // if (updateUserResponse.status !== 200) {
  //   alert('Ошибка изменения статуса верификации пользователя'); //FIXME implement with vuetify
  // }
}
