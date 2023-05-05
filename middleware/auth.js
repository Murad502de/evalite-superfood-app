import Cookies from 'js-cookie';
import { usersMy } from '@/api/users/usersMy';
import { authSignoutService } from '@/services/authSignoutService';
import * as routeNames from '@/shared/routeNames';

export default async function ({ route, redirect, store, }) {
  if (Cookies.get('token')) {
    const usersMyResponse = await usersMy();

    if (usersMyResponse.status !== 200) {
      authSignoutService();
      return redirect(`/${routeNames.signin}`);
    }

    store.dispatch('userStore/setUserData', usersMyResponse.data.data);

    if (
      route.name === routeNames.signin ||
      route.name === routeNames.signup ||
      route.name === routeNames.forgot ||
      route.name === routeNames.index
    ) {
      return redirect(`/${routeNames.home}`);
    }
  } else {
    if (
      route.name !== routeNames.signin &&
      route.name !== routeNames.signup &&
      route.name !== routeNames.forgot
    ) {
      return redirect(`/${routeNames.signin}`);
    }
  }
}
