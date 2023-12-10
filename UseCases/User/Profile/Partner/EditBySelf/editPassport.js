import { getObjectKeysCount } from '@/utils/object';
import { updateUserProfilePassport } from '@/Interactors/updateUserProfilePassport';
import { fetchUserSelf } from '@/Interactors/fetchUserSelf';

export const editPassport = async ({ data, component, store, }) => {
  // console.debug('editPassport/data', data); //DELETE
  // console.debug('editPassport/component', component); //DELETE
  // console.debug('editPassport/store', store); //DELETE
  const mustUpdate = getObjectKeysCount({ object: data, except: ['uuid'], }).length;
  // console.debug('editPassport/getObjectFieldsCount', mustUpdate); //DELETE

  //TODO muss aktualisiert werden?
  if (!mustUpdate) return;
  // console.debug('editPassport/UPDATE', data); //DELETE

  //TODO aktualisieren
  await updateUserProfilePassport(data);
  // console.debug('editPassport/updateUserProfilePersonal/FINISH'); //DELETE

  //TODO user bekomen
  await fetchUserSelf({ store, });
  // console.debug('editPassport/fetchUserSelf/FINISH'); //DELETE
};
