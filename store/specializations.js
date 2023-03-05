export const state = () => ({
  specializations: []
})

export const getters = {
  specializations: s => s.specializations
}


export const actions = {
  async fetchSpecializations({commit}) {

    const specializations = await this.$axios.get('/dictionary/specializations', {
      headers: {
        "Authorization": "Bearer a1c7c07794281f1ff168e19116c2d66b011bd61437dba46655a2cf581b90eb68"
      }
    });
    commit('setSpecializations', specializations)

  }
}

export const mutations = {
  setSpecializations(state, specializations) {
    state.specializations = specializations.data.data;
  }
}

