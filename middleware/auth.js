import Cookies from 'js-cookie';
import * as routeNames from '@/shared/routeNames';

// Cookies.set('token', ''); //DELETE

export default async function ({ route, redirect, }) {
  if (Cookies.get('token')) {
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
