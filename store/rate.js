export const state = () => ({
  service_rate: {},
  vacancy_rate: {},
})

export const getters = {
  service_rate(state) {
    return state.service_rate;
  },
  vacancy_rate(state) {
    return state.vacancy_rate;
  },
}


export const actions = {
  async createServiceRate({commit, dispatch}, {newRequest, object_uuid, service_uuid}) {
    console.log(newRequest, object_uuid, service_uuid);
    commit('response/setAwait', null, { root: true });
    const requests = await this.$axios.post('/objects/' + object_uuid + '/services/'  + service_uuid + '/rates',
      newRequest,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('service_id/fetchServiceId', {objectId: object_uuid, ServiceId: service_uuid}, {root: true});
        commit('response/setSuccess', {type: 'success', text: 'Ставка успешно создана', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        commit('response/setSuccess', {type: 'error', text: 'Ставка на этот день уже существует', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 3000);
        console.log(error);
      });
  },

  async putServiceRate({commit, dispatch}, {body, object_uuid, service_uuid, rate_uuid}) {
    let self= this;
    await this.$axios.put('/objects/' + object_uuid + '/services/'  + service_uuid + '/rates/' + rate_uuid,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('service_id/fetchServiceId', {objectId: object_uuid, ServiceId: service_uuid}, {root: true});
        commit('response/setSuccess', {type: 'success', text: 'Ставка успешно обновлена', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async removeServiceRate({commit, dispatch}, {object_uuid, service_uuid, rate_uuid}) {

    await this.$axios.delete('/objects/' + object_uuid + '/services/'  + service_uuid + '/rates/' + rate_uuid)
      .then((response) => {
        console.log(response);
       dispatch('service_id/fetchServiceId', {objectId: object_uuid, ServiceId: service_uuid}, {root: true});
      })
      .catch((error) => {
        console.log(error);
      });

  },

  async createVacancyRate({commit, dispatch}, {newRequest, object_uuid, vacancy_uuid}) {
    console.log(newRequest, object_uuid, vacancy_uuid);
    commit('response/setAwait', null, { root: true });
    const requests = await this.$axios.post('/objects/' + object_uuid + '/vacancies/'  + vacancy_uuid + '/rates',
      newRequest,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('vacancy_id/fetchVacancyId', {objectId: object_uuid, VacancyId: vacancy_uuid}, {root: true});
        commit('response/setSuccess', {type: 'success', text: 'Ставка успешно создана', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        commit('response/setSuccess', {type: 'error', text: 'Ставка на этот день уже существует', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 3000);
        console.log(error);
      });
  },

  async putVacancyRate({commit, dispatch}, {body, object_uuid, vacancy_uuid, rate_uuid}) {
    let self= this;
    await this.$axios.put('/objects/' + object_uuid + '/vacancies/'  + vacancy_uuid + '/rates/' + rate_uuid,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('vacancy_id/fetchVacancyId', {objectId: object_uuid, VacancyId: vacancy_uuid}, {root: true});
        commit('response/setSuccess', {type: 'success', text: 'Ставка успешно обновлена', }, {root: true});
        setTimeout(function() {
          //commit('response/removeSuccess', null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async removeVacancyRate({commit, dispatch}, {object_uuid, vacancy_uuid, rate_uuid}) {

    await this.$axios.delete('/objects/' + object_uuid + '/vacancies/'  + vacancy_uuid + '/rates/' + rate_uuid)
      .then((response) => {
        console.log(response);
        dispatch('service_id/fetchVacancyId', {objectId: object_uuid, ServiceId: vacancy_uuid}, {root: true});
      })
      .catch((error) => {
        console.log(error);
      });

  },
}

export const mutations = {
  setServiceRate(state, service_rate) {
    state.service_rate = service_rate.data.data;
  },
  setVacancyRate(state, vacancy_rate) {
    state.vacancy_rate = vacancy_rate.data.data;
  },

}

