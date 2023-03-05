export default async function ({ route, redirect, app }) {
  if (!window.localStorage.getItem('ruqi_auth_data') && route.name !== 'signin') {
    return redirect('/signin');
  }
  else if (route.name === 'signin' && window.localStorage.getItem('ruqi_auth_data')) {
    app.$auth.setToken();
    await app.store.dispatch('user/fetchUser');

    return redirect('/');
  }
  else if (window.localStorage.getItem('ruqi_auth_data')) {
    app.$auth.setToken();
    await app.store.dispatch('user/fetchUser');
  }
}
