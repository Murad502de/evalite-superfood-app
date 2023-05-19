import * as routeNames from '@/shared/routeNames';
import * as roles from '@/shared/roles';
import { authSignoutService } from '@/services/authSignoutService';

export const onSidebarLinkClicked = async (link, router) => {
  if (link.name === 'exit') await authSignoutService();
  router.push({ name: link.to });
}

export const getRedirectRouteName = (routeName, userDataRole) => {
  switch (routeName) {
    case routeNames.applications:
      return routeNames.applications;
    case routeNames.profile:
      return routeNames.profile;
    case routeNames.settings:
      return routeNames.settings;
    case routeNames.exit:
      return routeNames.index;
    default:
      return getRedirectRouteNameHome(userDataRole);
  }
};

export const getRedirectRouteNameHome = (role) => {
  switch (role) {
    case roles.admin:
      return routeNames.applications;
    default:
      return routeNames.home;
  }
};

export const isLinkActive = (routeName, route) => {
  return routeName === route.name;
};

export const isLinkHidden = (routeName, userDataRole) => {
  switch (routeName) {
    case routeNames.applications:
    case routeNames.settings:
    case routeNames.profile:
      return userDataRole !== roles.admin;
    case routeNames.home:
      return userDataRole === roles.admin;
    default:
      return false;
  }
};
