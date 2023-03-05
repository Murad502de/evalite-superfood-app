export const state = () => ({
  request_id_timesheet: [],
  request_id_professions: [],
  request_id_summary: []
})

export const getters = {
  request_id_timesheet(state) {
    return state.request_id_timesheet;
  },
  request_id_professions(state) {
    return state.request_id_professions;
  },
  request_id_summary(state) {
    return state.request_id_summary;
  },
}


export const actions = {
  async fetchRequestIdTimeSheet({commit}, requestId) {

    const request_id_timesheet = await this.$axios.get('/tasks/' + requestId + '/timesheet');
    commit('setRequest', request_id_timesheet)
  },

  async fetchRequestIdTimeSheetSummary({commit}, requestId) {
    const request_id_summary = await this.$axios.get('/tasks/' + requestId + '/timesheet/summary');
    commit('setRequestSummary', request_id_summary)
  },

  async fillOutAssigned({commit, dispatch}, requestId) {
    const request_id_timesheet = await this.$axios.post('/tasks/' + requestId + '/timesheet/assigned',
      {},)
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestIdTimeSheet', requestId);
        commit('response/setSuccess', {type: 'success', text: 'Данные обновлены',}, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 2000);

      })
      .catch((error) => {
        console.log(error);
      });

  },

  async putRequestIdTimeSheet({commit, dispatch}, {uuid, body}) {
    let self = this;
    await this.$axios.put('/tasks/' + uuid + '/timesheet/assigned',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestIdTimeSheet', uuid);
        dispatch('fetchRequestIdTimeSheetSummary', uuid);
        commit('response/setSuccess', {type: 'success', text: 'Данные обновлены',}, {root: true});
        setTimeout(function () {
          commit('response/removeSuccess', null, {root: true});
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });

  },
  async fetchRequestIdProfessions({commit}, requestId) {
    const request_id_professions = await this.$axios.get('/tasks/' + requestId + '/timesheet/professions/');
    commit('setRequestIdProfessions', request_id_professions)
  },
  async putRequestIdLoadPayments({commit, dispatch}, {uuid}) {
    let self = this;
    await this.$axios.put('/tasks/' + uuid + '/timesheet/payments',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        dispatch('fetchRequestIdTimeSheet', uuid);
        commit('response/setSuccess', {type: 'success', text: 'Данные загружены',}, {root: true});
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
  setRequest(state, request_id_timesheet) {
    let request = request_id_timesheet.data.data;
    let assigned = request.assigned.map((item, index) => ({
      id: index + 1,
      activeChangeButton: 0,
      ...item
    }));

    request.assigned = assigned;

    state.request_id_timesheet = request;
  },
  updateChangeButton(state, {id, activeStatus}) {
    state.request_id_timesheet.assigned[id].activeChangeButton = +activeStatus;
  },
  setRequestIdProfessions(state, request_id_professions) {
    state.request_id_professions = request_id_professions.data.data;
  },
  setRequestSummary(state, request_id_summary) {
    state.request_id_summary = request_id_summary.data.data;
  },
}
