import { getObjectKeysCount } from '@/utils/object';
import { updateUserProfilePersonal } from '@/Interactors/updateUserProfilePersonal';
import { fetchUserSelf } from '@/Interactors/fetchUserSelf';

export const editPersonal = async ({ data, component, store, }) => {
  console.debug('editPersonal/data', data); //DELETE
  console.debug('editPersonal/component', component); //DELETE
  console.debug('editPersonal/store', store); //DELETE
  const mustUpdate = getObjectKeysCount({ object: data, except: ['uuid'], }).length;
  console.debug('editPersonal/getObjectFieldsCount', mustUpdate); //DELETE

  //TODO muss aktualisiert werden?
  if (!mustUpdate) return;

  //TODO aktualisieren
  await updateUserProfilePersonal(data);

  console.debug('editPersonal/updateUserProfilePersonal/FINISH'); //DELETE

  //TODO user bekomen
  await fetchUserSelf({ store, });

  console.debug('editPersonal/fetchUserSelf/FINISH'); //DELETE
};
