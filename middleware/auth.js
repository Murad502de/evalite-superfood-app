import Cookies from 'js-cookie';
import { usersMy } from '@/api/users/usersMy';
import { authSignoutService } from '@/services/authSignoutService';
import * as routeNames from '@/shared/routeNames';
import * as httpResponse from '@/shared/httpResponses';
import { userUuidInAdapter } from '@/api/adapters/users/userUuidInAdapter';

export default async function ({ route, redirect, store, }) {
  if (Cookies.get('token')) {
    const usersMyResponse = await usersMy();

    if (usersMyResponse.status !== httpResponse.HTTP_OK) {
      await authSignoutService();
      return redirect(`/${routeNames.signin}`);
    }

    store.dispatch('userStore/setUserData', await userUuidInAdapter(usersMyResponse.data.data));

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
