export const state = () => ({
  request_id: [],
  request_id_professions: [],

})

export const getters = {
  request_id(state) {
    return state.request_id;
  },
  request_id_professions(state) {
    return state.request_id_professions;
  },
}


export const actions = {
  async fetchRequestId({commit}, requestId) {

    const request_id = await this.$axios.get('/tasks/' + requestId);
    commit('setRequest', request_id)

  },
  async fetchRequestIdProfessions({commit}, requestId) {

    const request_id_professions = await this.$axios.get('/objects/' + requestId + '/professions');
    commit('setRequestProfessions', request_id_professions)

  },
  async putStatus({commit, dispatch}, {requestId, status}) {
    await this.$axios.put('/tasks/' + requestId + '/' + status,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        dispatch('fetchRequestId', requestId);
        commit('response/setSuccess', {type: 'success', text: 'Заявка успешно обновлена',}, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async putTaskWorks({commit, dispatch}, {uuid, body}) {
    await this.$axios.put('/tasks/'+uuid +'/works ',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        commit('response/setSuccess', {type: 'success', text: 'Ваша заявка успешно обновлена', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async putTaskContacts({commit, dispatch}, {uuid, body}) {
    await this.$axios.put('/tasks/'+uuid +'/contacts ',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        commit('response/setSuccess', {type: 'success', text: 'Ваша заявка успешно обновлена', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async putTaskDispatchers({commit, dispatch}, {uuid, body}) {
    await this.$axios.put('/tasks/'+uuid +'/dispatchers ',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        commit('response/setSuccess', {type: 'success', text: 'Ваша заявка успешно обновлена', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async subscribeToObject({commit, dispatch}, {requestId, objectId}) {
    const requests = await this.$axios.post('/user/subscribe/objects',
      objectId,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestId', requestId);

      })
      .catch((error) => {
        console.log(error);
      });

  },
  async respondToTask({commit, dispatch}, {requestId}) {
    const requests = await this.$axios.post('/user/tasks/'+requestId+'/request',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestId', requestId);
        commit('response/setSuccess', {type: 'success', text: 'Ваш отклик принят',}, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 2000);

      })
      .catch((error) => {
        console.log(error);
      });
  },
  async acceptToTask({commit, dispatch}, {requestId}) {
    await this.$axios.put('/user/tasks/'+requestId+'/accept',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        dispatch('fetchRequestId', requestId);
        commit('response/setSuccess', {type: 'success', text: 'Ваш отклик принят',}, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async rejectToTask({commit, dispatch}, {requestId}) {
    await this.$axios.put('/user/tasks/'+requestId+'/reject',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        dispatch('fetchRequestId', requestId);
        commit('response/setSuccess', {type: 'success', text: 'Вы отказались от заявки',}, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async cancelToTask({commit, dispatch}, {requestId}) {
    await this.$axios.put('/user/tasks/'+requestId+'/cancel',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        dispatch('fetchRequestId', requestId);
        commit('response/setSuccess', {type: 'success', text: 'Вы отказались от заявки',}, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },
}

export const mutations = {
  setRequest(state, request_id) {
    state.request_id = request_id.data.data;
  },
  setRequestProfessions(state, request_id_professions) {
    state.request_id_professions = request_id_professions.data.data;
  },

}

