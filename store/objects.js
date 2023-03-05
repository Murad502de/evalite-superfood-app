export const state = () => ({
  objects: [],
  objects_map: [],
})

export const getters = {
  objects(state) {
    return state.objects;
  },
  objects_map(state) {
    return state.objects_map;
  },
}


export const actions = {
  async fetchObjects({commit}, params) {

    const objects = await this.$axios.get('/objects', {
      params: params
    });
    commit('setObjects', objects)

  },
  async fetchObjectsMap({commit}, params) {

    const objects_map = await this.$axios.get('/objects', {
      params: params
    });
    commit('setObjectsMap', objects_map)

  },
  async fetchObjectsAccount({commit}, requestID) {
    const objects = await this.$axios.get('/super_manager/accounts/'+requestID+'/objects');
    commit('setObjects', objects)

  },
  async createRequest({commit, dispatch}, newRequest) {
    let self= this;
    commit('response/setAwait', null, { root: true });
    const requests = await this.$axios.post('/objects',
      newRequest,
      {
        headers: {
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetchObjects');
        commit('response/setSuccess', {type: 'success', text: 'Объект успешно создан', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
        setTimeout(function() {
          self.$router.push('/objects/');
        }, 3000);

      })
      .catch((error) => {
        commit('response/setSuccess', {type: 'error', text: 'Заполните поля объекта', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 3000);
        console.log(error);
      });

  },
  async putRequest({commit, dispatch}, {uuid, body}) {
    let self= this;
    await this.$axios.put('/objects/'+uuid,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetchObjects');
        commit('response/setSuccess', {type: 'success', text: 'Объект успешно обновлен', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
        setTimeout(function() {
          self.$router.push('/objects/');
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });


  },
  async removeRequest({commit, dispatch}, requestID) {
    let self= this;
    await this.$axios.delete('/objects/'+requestID)
      .then((response) => {
        dispatch('fetchObjects');
        commit('response/setSuccess', {type: 'success', text: 'Объект удален', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
        setTimeout(function() {
          self.$router.push('/objects/');
        }, 3000);

      })
      .catch((error) => {
        console.log(error);
      });

  },
}

export const mutations = {
  setObjects(state, objects) {
    state.objects = objects.data.data;
  },
  setObjectsMap(state, objects_map) {
    state.objects_map = objects_map.data.data;
  },
}

