export const state = () => ({
  requests: [],
  tasks_filters: [],
})

export const getters = {
  requests(state) {
    return state.requests;
  },
  tasks_filters(state) {
    return state.tasks_filters;
  },
}


export const actions = {
  async fetch({commit}, {params, concat, unit}) {
    const requests = await this.$axios.get('/tasks', {
      params: params
    });
    commit('setRequest', {requests, concat, unit})
  },

  async createRequest({commit, dispatch}, newRequest) {
    let self = this;
    commit('response/setAwait', null, {root: true});
    const requests = await this.$axios.post('/tasks',
      newRequest,
      {
        headers: {
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetch');
        commit('response/setSuccess', {type: 'success', text: 'Ваша заявка успешно создана',}, {root: true});
        self.$router.push('/tasks/' + response.data.uuid + '/edit');
        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 2000);

      })
      .catch((error) => {
        commit('response/setSuccess', {type: 'error', text: 'Заполните поля заявки',}, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 3000);
        console.log(error);
      });

  },

  async copyRequest({commit, dispatch}, requestID) {
    let self = this;
    const requests = await this.$axios.post('/tasks/' + requestID + '/copy',
      '',
      {
        headers: {
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log('--------', response.data.data);
        dispatch('fetch',  {params: {}, concat: false, unit: false});
        commit('response/setSuccess', {type: 'success', text: 'Заявка успешно скопирована',}, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 2000);
        setTimeout(function () {
          self.$router.push('/tasks/' + response.data.data + '/edit');
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });

  },

  async removeRequest({commit, dispatch}, uuids) {

    await this.$axios.delete('/tasks/', {
      headers: { 'Content-Type': 'application/json', },
      data: uuids
    })
      .then((response) => {
        console.log(response);
        dispatch('fetch',  {params: {}, concat: false, unit: false});
        commit('response/setSuccess', {type: 'success', text: 'Удаление прошло успешно',}, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 2000);

      })
      .catch((error) => {
        console.log(error);
      });

  },

  async putRequest({commit, dispatch}, {uuid, body}) {
    let self = this;
    await this.$axios.put('/tasks/' + uuid,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetch');
        commit('response/setSuccess', {type: 'success', text: 'Ваша заявка успешно обновлена',}, {root: true});
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
  setRequest(state, {requests, concat, unit}) {

    if (concat) {
      state.requests = state.requests.concat(requests.data.data);
    } else {
      state.requests = requests.data.data;
    }

    if (unit) {
      state.tasks_filters = requests.data.meta.filters;
    }

  },
}



