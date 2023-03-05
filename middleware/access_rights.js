
export default function access_rights({ route, store, redirect }) {
  let user = store.getters['user/user'];
  let subroute = false;

  if (Object.keys(user).length != 0) {
    user.visibility_sections.forEach(function (item) {
      if (route.name && route.name.includes(item)) {
        subroute = true;
      }
    });

    if (
      route.name != 'index'
      && route.name != 'signin'
      && route.name !== 'auth-signup-executor'
      && route.name !== 'auth-signin-executor'
      && route.name !== 'auth-signup-executor-steps'
      && route.name !== 'auth-signin-executor-recover'
      && route.name !== 'auth-signin-executor-login'
      && route.name !== 'auth-signin-executor-recover-phone'
      && route.name !== 'auth-signin-executor-recover-sms'
      && route.name !== 'auth-signin-executor-recover-password'
      && route.name !== 'auth-signin-super-manager'
      && route.name !== 'auth-signin-super-manager-recover-email'
      && route.name !== 'auth-signin-super-manager-recover-sms'
      && route.name !== 'auth-signin-super-manager-recover-password'
      && !(user.visibility_sections.includes(route.name) || subroute)
    ) {
      redirect('/');
    }
  }
}
