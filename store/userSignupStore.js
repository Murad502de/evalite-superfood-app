import { userSignupDomain } from '@/domain/userSignupDomain';

export const state = () => ({
  userSignupData: userSignupDomain,
});

export const getters = {
  userSignupData(state) {
    return state.userSignupData;
  },
}

export const actions = {
  async setUserSignupData({ commit }, payload = {}) {
    commit('updateUserSignupData', payload);
  },
}

export const mutations = {
  updateUserSignupData(state, payload) {
    state.userSignupData = {
      ...state.userSignupData,
      ...payload,
    };
  },
}
