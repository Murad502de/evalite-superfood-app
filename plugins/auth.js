import axios from 'axios';

export default ({ app, store, }, inject) => {
  inject(
    'auth',

    {
      async signin(payload = {}) {
        try {
          return await axios.post(
            `https://cdn.ruqi.maxber.ru/api/v1/auth/login`,

            payload
          );
        }
        catch (err) {
          console.error(err);
        }
      },

      setToken() {
        const token = JSON.parse(localStorage.getItem('ruqi_auth_data')).token;

        console.log('setToken', token);

        app.$axios.setToken(token, 'Bearer');
        store._actions['user/setUserAuthorizationStatus'][0]({status: true});
      },
    }
  );
}
