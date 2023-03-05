export const state = () => ({
  isMobile: null,
  isTablet: null,
  isSmallScreen: null,
  isLargeScreen: null,
  isExtraLargeScreen: null,
});
export const getters = {
  IS_MOBILE(state) {
    return state.isMobile;
  },
  IS_TABLET(state) {
    return state.isTablet;
  },
  IS_SMALL_SCREEN(state) {
    return state.isSmallScreen;
  },
  IS_LARGE_SCREEN(state) {
    return state.isLargeScreen;
  },
  IS_EXTRA_LARGE_SCREEN(state) {
    return state.isExtraLargeScreen;
  },
};
export const actions = {
  async setIsMobile({ commit, }, { isMobile }) {
    commit('updateIsMobile', isMobile);
  },
  async setIsTablet({ commit, }, { isTablet }) {
    commit('updateIsTablet', isTablet);
  },
  async setIsSmallScreen({ commit, }, { isSmallScreen }) {
    commit('updateIsSmallScreen', isSmallScreen);
  },
  async setIsLargeScreen({ commit, }, { isLargeScreen }) {
    commit('updateIsLargeScreen', isLargeScreen);
  },
  async setIsExtraLargeScreen({ commit, }, { isExtraLargeScreen }) {
    commit('updateIsExtraLargeScreen', isExtraLargeScreen);
  },
};
export const mutations = {
  updateIsMobile(state, isMobile) {
    state.isMobile = isMobile;
  },
  updateIsTablet(state, isTablet) {
    state.isTablet = isTablet;
  },
  updateIsSmallScreen(state, isSmallScreen) {
    state.isSmallScreen = isSmallScreen;
  },
  updateIsLargeScreen(state, isLargeScreen) {
    state.isLargeScreen = isLargeScreen;
  },
  updateIsExtraLargeScreen(state, isExtraLargeScreen) {
    state.isExtraLargeScreen = isExtraLargeScreen;
  },
};
