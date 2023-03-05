export const state = () => (
  {
    regions: [],
    specializations: [],
    clients: [],
    organizations: [],
    objectType: [],
    dispatchers: [],
    managers: [],
    professions: [],
    payments: [],
  }
)

export const mutations = {
  setRegions(state, regions) {
    state.regions = regions;
  },

  setSpecializations(state, specializations) {
    state.specializations = specializations;
  },

  setClients(state, clients) {
    state.clients = clients.data.data;
  },

  setOrganizations(state, organizations) {
    state.organizations = organizations.data.data;
  },

  setObjectType(state, objectType) {
    state.objectType = objectType.data.data;
  },

  setDispatchers(state, dispatchers) {
    state.dispatchers = dispatchers.data.data;
  },

  setManagers(state, managers) {
    state.managers = managers.data.data;
  },

  setProfessions(state, professions) {
    state.professions = professions;
  },

  setPayments(state, payments) {
    state.payments = payments;
  },
}


export const actions = {
  async fetchRegions(ctx) {
    const regions = await this.$axios.get(`/dictionary/regions`,);

    ctx.commit('setRegions', regions.data.data);

    return regions.data.data;
  },

  async fetchSpecializations(ctx) {
    const specializations = await this.$axios.get(`/dictionary/specializations`);

    ctx.commit('setSpecializations', specializations.data.data);
  },

  async fetchClients({ commit }) {

    const clients = await this.$axios.get('/dictionary/accounts', {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3"
      }
    });
    commit('setClients', clients)
  },

  async fetchOrganizations({ commit }) {

    const organizations = await this.$axios.get('/dictionary/organizations', {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3"
      }
    });
    commit('setOrganizations', organizations)
  },

  async fetchObjectType({ commit }) {

    const objectType = await this.$axios.get('/dictionary/object-type', {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3"
      }
    });
    commit('setObjectType', objectType)
  },

  async fetchDispatchers({ commit }) {

    const dispatchers = await this.$axios.get('/dictionary/dispatchers', {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3"
      }
    });
    commit('setDispatchers', dispatchers)
  },

  async fetchManagers({ commit }) {

    const managers = await this.$axios.get('/dictionary/managers', {
      headers: {
        "Authorization": "Bearer eb5e61886e9a766273b4ea87ad67844c5e5ee22a8e22bffce0225151dfc5eaf3"
      }
    });
    commit('setManagers', managers)
  },

  async fetcProfessions({ commit }) {
    const professions = await this.$axios.get('/dictionary/professions');

    commit('setProfessions', professions.data.data);

    return professions.data.data;
  },

  async fetcPayments({ commit }) {

    const payments = await this.$axios.get(
      '/dictionary/payments',
    );

    console.debug('store : payments');
    console.debug(payments);

    commit('setPayments', payments.data.data);
  },
}

export const getters = {
  regions(state) {
    return state.regions;
  },

  specializations(state) {
    return state.specializations;
  },

  clients(state) {
    return state.clients;
  },

  organizations(state) {
    return state.organizations;
  },

  objectType(state) {
    return state.objectType;
  },

  dispatchers(state) {
    return state.dispatchers;
  },

  managers(state) {
    return state.managers;
  },

  professions(state) {
    return state.professions;
  },

  payments(state) {
    return state.payments;
  },
}
