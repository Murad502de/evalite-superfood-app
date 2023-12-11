import { getObjectKeysCount } from '@/utils/object';
import { updateUserProfileContract } from '@/Interactors/updateUserProfileContract';
import { fetchUserSelf } from '@/Interactors/fetchUserSelf';

export const editContract = async ({ data, component, store, }) => {
  console.debug('editContract/data', data); //DELETE
  const mustUpdate = getObjectKeysCount({ object: data, except: ['uuid'], }).length;
  console.debug('editContract/getObjectFieldsCount', mustUpdate); //DELETE

  //TODO muss aktualisiert werden?
  if (!mustUpdate) return;
  console.debug('editContract/UPDATE', data); //DELETE

  //TODO aktualisieren
  await updateUserProfileContract(data);
  console.debug('editContract/updateUserProfilePersonal/FINISH'); //DELETE

  //TODO user bekomen
  await fetchUserSelf({ store, });
  console.debug('editContract/fetchUserSelf/FINISH'); //DELETE
};
