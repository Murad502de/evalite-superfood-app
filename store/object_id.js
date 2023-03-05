export const state = () => ({
  object_id: [],
  object_id_requests: [],
  object_id_services: [],
  object_id_vacancies: [],
  object_id_history: [],
  service_filters: [],
  vacancy_filters: [],
  task_filters: [],
})

export const getters = {
  object_id(state) {
    return state.object_id;
  },
  object_id_requests(state) {
    return state.object_id_requests;
  },
  object_id_services(state) {
    return state.object_id_services;
  },
  object_id_vacancies(state) {
    return state.object_id_vacancies;
  },
  object_id_history(state) {
    return state.object_id_history;
  },
  service_filters(state) {
    return state.service_filters;
  },
  vacancy_filters(state) {
    return state.vacancy_filters;
  },
  task_filters(state) {
    return state.task_filters;
  },
}


export const actions = {
  async fetchObjectId({commit}, requestId) {

    const object_id = await this.$axios.get('/objects/' + requestId,);
    commit('setRequest', object_id);

  },
  async fetchObjectIdRequest({commit}, {requestId, params, concat, unit}) {

    const object_id_requests = await this.$axios.get('/objects/' + requestId + '/tasks',);
    commit('setObjectIdRequests',  {object_id_requests: object_id_requests, concat: concat, unit: unit});

  },
  async fetchObjectIdServices({commit}, {requestId, params, concat, unit}) {

    const object_id_services = await this.$axios.get('/objects/' + requestId + '/services', {
      params: params
    });
    commit('setObjectIdServices', {object_id_services: object_id_services, concat: concat, unit: unit});

  },
  async fetchObjectIdVacancies({commit}, {requestId, params, concat, unit}) {

    const object_id_vacancies = await this.$axios.get('/objects/' + requestId + '/vacancies',{
      params: params
    });
    commit('setObjectIdVacancies', {object_id_vacancies: object_id_vacancies, concat: concat, unit: unit});

  },
  async fetchObjectIdHistory({commit}, {requestId, params, concat}) {

    const object_id_history = await this.$axios.get('/objects/' + requestId + '/history',{
      params: params
    });
    commit('setObjectIdHistory', {object_id_history: object_id_history, concat: concat,} );

  },
  async putStatus({commit, dispatch}, {requestId, status}) {
    await this.$axios.put('/objects/' + requestId + '/' + status,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        dispatch('fetchObjectId', requestId);
        commit('response/setSuccess', {type: 'success', text: 'Объект успешно обновлен',}, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  resetObjectState({commit}) {
    commit('resetObjectState');
  },

  async removeTask({commit, dispatch}, {object_uuid, uuid}) {

    await this.$axios.delete('/objects/' + object_uuid + '/tasks',{
      headers: { 'Content-Type': 'application/json', },
      data: uuid
    })
      .then((response) => {
        console.log(response);
        dispatch('object_id/fetchObjectIdRequest', {requestId:object_uuid, params:{}, concat: false, unit: false}, {root: true});
      })
      .catch((error) => {
        console.log(error);
      });

  },
}

export const mutations = {
  setRequest(state, object_id) {
    state.object_id = object_id.data.data;
  },
  setObjectIdRequests(state, {object_id_requests, concat, unit}) {
    if (concat) {
      state.object_id_requests = state.object_id_requests.concat(object_id_requests.data.data);
    } else {
      state.object_id_requests = object_id_requests.data.data;
    }
    if (unit) {
      state.task_filters = object_id_requests.data.meta.filters;
    }
  },
  setObjectIdServices(state, {object_id_services, concat, unit}) {
    if (concat) {
      state.object_id_services = state.object_id_services.concat(object_id_services.data.data);
    } else {
      state.object_id_services = object_id_services.data.data;
    }

    if (unit) {
      state.service_filters = object_id_services.data.meta.filters;
    }

  },
  setObjectIdVacancies(state, {object_id_vacancies, concat, unit}) {
    if (concat) {
      state.object_id_vacancies = state.object_id_vacancies.concat(object_id_vacancies.data.data);
    } else {
      state.object_id_vacancies = object_id_vacancies.data.data;
    }
    if (unit) {
      state.vacancy_filters = object_id_vacancies.data.meta.filters;
    }
  },
  setObjectIdHistory(state,  {object_id_history, concat}) {
    if (concat) {
      state.object_id_history = state.object_id_history.concat(object_id_history.data.data);
    } else {
      state.object_id_history = object_id_history.data.data;
    }
  },
  resetObjectState(state) {
    state.object_id = [];
    state.object_id_requests = [];
    state.object_id_services = [];
    state.object_id_vacancies = [];
    state.object_id_history = [];
    state.service_filters = [];
    state.vacancy_filters = [];
    state.task_filters = [];
  }
}

