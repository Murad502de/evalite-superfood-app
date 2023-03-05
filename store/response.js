export const state = () => ({
  response: {
    status: false,
    text: '',
    type: 'error',
    await: false
  },
})

export const getters = {
  requestSuccess(state) {
    return state.response;
  },
}


export const actions = {

}

export const mutations = {
  setAwait(state){
    state.response.await = true;
  },
  setSuccess(state, { type, text }){
    state.response.status = true;
    state.response.type = type;
    state.response.text = text;
    state.response.await = false;
  },
  removeSuccess(state){
    state.response.status = false;
    state.response.await = false;
  }
}

