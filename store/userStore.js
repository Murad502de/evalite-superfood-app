import { userDomain } from '@/domain/userDomain';

export const state = () => ({
  userData: userDomain,
});

export const getters = {
  userData(state) {
    return state.userData;
  },
}

export const actions = {
  async setUserData({ commit }, payload = {}) {
    commit('updateUserData', payload);
  },
}

export const mutations = {
  updateUserData(state, payload) {
    state.userData = {
      ...state.userData,
      ...payload,
    };
  },
}
