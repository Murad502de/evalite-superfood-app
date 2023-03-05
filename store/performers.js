export const state = () => ({
  performers: []
})

export const mutations = {
  setUsers(state, performers) {
    state.performers = performers
  }
}

export const actions = {
  async fetch({commit}) {
    const performers = await this.$axios.$get('https://jsonplaceholder.typicode.com/users')
    commit('setUsers', performers)
  }
}

export const getters = {
  performers: s => s.performers
}
