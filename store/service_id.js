export const state = () => ({
  service_id: {},
})

export const getters = {
  service_id(state) {
    return state.service_id;
  },
}


export const actions = {
  async fetchServiceId({commit}, {objectId, ServiceId}) {
    const service_id = await this.$axios.get('/objects/' + objectId +'/services/' + ServiceId);
    commit('setService', service_id);
  },
  async createService({commit, dispatch}, {newRequest, object_uuid}) {
    let self= this;
    console.log(newRequest, object_uuid);
    commit('response/setAwait', null, { root: true });
    const requests = await this.$axios.post('/objects/' + object_uuid + '/services',
      newRequest,
      {
        headers: {
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        commit('response/setSuccess', {type: 'success', text: 'Услуга успешно создана', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
        self.$router.push('/objects/' + object_uuid + '/service/' + response.data.uuid);

      })
      .catch((error) => {
        commit('response/setSuccess', {type: 'error', text: 'Заполните поля формы', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 3000);
        console.log(error);
      });

  },
  async putService({commit, dispatch}, {body, object_uuid, service_uuid, isClose}) {
    let self= this;
    await this.$axios.put('/objects/' + object_uuid + '/services/' + service_uuid,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('fetchServiceId');
        commit('response/setSuccess', {type: 'success', text: 'Услуга успешно обновлена', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
        if(isClose){
          setTimeout(function() {
            self.$router.push('/objects/'+object_uuid);
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async removeService({commit, dispatch}, {object_uuid, uuid}) {

    await this.$axios.delete('/objects/' + object_uuid + '/services',
      {
        headers: { 'Content-Type': 'application/json', },
        data: uuid
      })
      .then((response) => {
        console.log(response);
        dispatch('object_id/fetchObjectIdServices',  {requestId:object_uuid, params:{}, concat: false, unit: false}, {root: true});
      })
      .catch((error) => {
        console.log(error);
      });

  },
}

export const mutations = {
  setService(state, service_id) {
    state.service_id = service_id.data.data;
  },

}

