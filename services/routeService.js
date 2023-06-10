import * as routeNames from '@/shared/routeNames';
import * as roles from '@/shared/roles';

export const protect = (routeName, userRole) => {
  switch (routeName) {
    case routeNames.applications:
    case routeNames.settings:
      return userRole !== roles.admin;
    case routeNames.profile:
      return true;
    default:
      return false;
  }
};
