import { usersUuidUpdate } from '@/api/users/usersUuidUpdate';
import { userUuidOutAdapter } from '@/api/adapters/users/userUuidOutAdapter';
import { usersMy } from '@/api/users/usersMy';
import { usersUuid } from '@/api/users/usersUuid';
import { userUuidInAdapter } from '@/api/adapters/users/userUuidInAdapter';
import * as httpResponse from '@/shared/httpResponses';

export const updateUser = async (data = null) => {
  console.debug('updateUser/data', data); //DELETE
  if (!data) return;
  const usersUuidUpdateResponse = await usersUuidUpdate(await userUuidOutAdapter(data));
  console.debug('updateUser/usersUuidUpdateResponse', usersUuidUpdateResponse); //DELETE
  return usersUuidUpdateResponse;
}

export const fetchUserMy = async () => {
  console.debug('fetchUserMy'); //DELETE
  const usersMyResponse = await usersMy();
  console.debug('fetchUserMy/usersMyResponse', usersMyResponse); //DELETE

  if (usersMyResponse.status !== httpResponse.HTTP_OK) {
    return null;
  }

  return userUuidInAdapter(usersMyResponse.data.data);
};

export const fetchUser = async (uuid = null) => {
  console.debug('fetchUser/uuid', uuid); //DELETE
  if (!uuid) return;
  const usersUuidResponse = await usersUuid(uuid);
  console.debug('fetchUser/usersUuidResponse', usersUuidResponse); //DELETE

  if (usersUuidResponse.status !== httpResponse.HTTP_OK) {
    return null;
  }

  return userUuidInAdapter(usersUuidResponse.data.data);
};
