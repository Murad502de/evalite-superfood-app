
import { protect } from '@/services/routeService';
import * as routeNames from '@/shared/routeNames';

export default function routeProtection({ route, store, redirect }) {
  const user = store.getters['userStore/userData'];
  const userRole = user.role;
  const routeName = route.name;

  if (protect(routeName, userRole)) {
    redirect(routeNames.home);
  }
}
