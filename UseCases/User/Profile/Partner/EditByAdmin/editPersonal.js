import { getObjectKeysCount } from '@/utils/object';
import { updateUserProfilePersonal } from '@/Interactors/updateUserProfilePersonal';
import { fetchUserDetail } from '@/Interactors/fetchUserDetail';

export const editPersonal = async ({ data, component, store, }) => {
  console.debug('editPersonal/data', data); //DELETE
  console.debug('editPersonal/component', component); //DELETE
  console.debug('editPersonal/store', store); //DELETE
  const mustUpdate = getObjectKeysCount({ object: data, except: ['uuid'], }).length;
  console.debug('editPersonal/getObjectFieldsCount', mustUpdate); //DELETE

  //TODO muss aktualisiert werden?
  if (!mustUpdate) return;
  console.debug('editPersonal/UPDATE'); //DELETE

  //TODO aktualisieren
  await updateUserProfilePersonal(data);

  console.debug('editPersonal/updateUserProfilePersonal/FINISH'); //DELETE

  //TODO user bekomen
  const user = await fetchUserDetail(data.uuid);

  console.debug('editPersonal/fetchUser/FINISH', user); //DELETE

  return user;
};
