export const state = () => ({
  clients: [],
  statusCreateClient: {
    status: false,
    uuid: null
  }
})

export const getters = {
  clients(state) {
    return state.clients;
  },
  statusCreateClient(state) {
    return state.statusCreateClient;
  },
}


export const actions = {
  async fetchClients({commit}, params) {

    const clients = await this.$axios.get('/super_manager/accounts', {
      params: params
    });
    commit('setClients', clients)

  },

  async createRequest({commit, dispatch}, newRequest) {
    let self = this;
    commit('response/setAwait', null, { root: true });
    const requests = await this.$axios.post('/super_manager/accounts',
      newRequest,
      {
        headers: {
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);

        commit('response/setSuccess', {type: 'success', text: 'Клиент успешно создан',}, {root: true});
        commit('setStatusCreateClient', {status: true, uuid: response.data.data.uuid});

        dispatch('fetchClients');

        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 2000);
        setTimeout(function () {
          self.$router.push('/clients/');
        }, 3000);

      })
      .catch((error) => {
        commit('response/setSuccess', {type: 'error', text: 'Заполните поля',}, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 3000);
        console.log(error);
      });
  },

  async putRequest({commit, dispatch}, {uuid, body}) {
    let self = this;
    await this.$axios.put('/super_manager/accounts/' + uuid,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetchClients');
        commit('response/setSuccess', {type: 'success', text: 'Клиент успешно обновлен',}, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 2000);
        setTimeout(function () {
          self.$router.push('/clients/');
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });

  },

  async putStatus({commit, dispatch}, {requestId, status, currentList}) {
    await this.$axios.put('/super_manager/accounts/' + requestId + '/' + status,
      '',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        dispatch('fetchClients', {status: currentList});
        commit('response/setSuccess', {type: 'success', text: 'Статус клиента изминен',}, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async removeRequest({commit, dispatch}, {requestId, status}) {
    console.log(status);

    await this.$axios.delete('/super_manager/accounts/' + requestId)
      .then((response) => {
        console.log(response);
        dispatch('fetchClients', {"status": status});

      })
      .catch((error) => {
        console.log(error);
      });

  },
}

export const mutations = {
  setClients(state, clients) {
    state.clients = clients.data.data;
  },
  setStatusCreateClient(state, {status, uuid}) {
    state.statusCreateClient.status = status;
    state.statusCreateClient.uuid = uuid;

    console.log('статус - ', state.statusCreateClient);
  },
}

