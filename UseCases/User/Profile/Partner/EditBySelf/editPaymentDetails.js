import { getObjectKeysCount } from '@/utils/object';
import { updateUserProfilePaymentDetails } from '@/Interactors/updateUserProfilePaymentDetails';
import { fetchUserSelf } from '@/Interactors/fetchUserSelf';

export const editPaymentDetails = async ({ data, component, store, }) => {
  console.debug('editPaymentDetails/data', data); //DELETE
  const mustUpdate = getObjectKeysCount({ object: data, except: ['uuid'], }).length;
  console.debug('editPaymentDetails/getObjectFieldsCount', mustUpdate); //DELETE

  //TODO muss aktualisiert werden?
  if (!mustUpdate) return;
  console.debug('editPaymentDetails/UPDATE', data); //DELETE

  //TODO aktualisieren
  await updateUserProfilePaymentDetails(data);
  console.debug('editPaymentDetails/updateUserProfilePersonal/FINISH'); //DELETE

  //TODO user bekomen
  await fetchUserSelf({ store, });
  console.debug('editPaymentDetails/fetchUserSelf/FINISH'); //DELETE
};
