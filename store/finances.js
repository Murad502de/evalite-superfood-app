export const state = () => ({
  finances: [],
  summary: [],
})

export const getters = {
  finances(state) {
    return state.finances;
  },
  summary(state) {
    return state.summary;
  },
}


export const actions = {
  async fetchFinances({ commit }, params) {

    const finances = await this.$axios.get('user/finances', {
      params: params
    });

    commit('setFinances', finances);

  },
  async fetchSummary({ commit }, params) {
    const summary = await this.$axios.get('user/summary', {
      params: params
    });

    commit('setSummary', summary);
  },
}

export const mutations = {
  setFinances(state, finances) {
    state.finances = finances.data.data;
  },
  setSummary(state, summary) {
    state.summary = summary.data.data;
  },
}

