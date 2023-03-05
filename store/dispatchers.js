export const state = () => ({
  dispatchers: []
})

export const getters = {
  dispatchers: s => s.dispatchers
}


export const actions = {
  async fetchDispatchers({commit}) {

    const dispatchers = await this.$axios.get('/manager/dispatchers', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68" // DELETE
      }
    });
    commit('setDispatchers', dispatchers)

  }
}

export const mutations = {
  setDispatchers(state, dispatchers) {
    state.dispatchers = dispatchers.data.data;
  }
}

