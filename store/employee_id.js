export const state = () => (
  {
    employee_id: {},
    employee_id_tasks: [],
    employee_id_support: [],
    employee_id_active: [],
  }
)

export const getters = {
  employee_id(state) {
    return state.employee_id;
  },
  employee_id_tasks(state) {
    return state.employee_id_tasks;
  },
  employee_id_support(state) {
    return state.employee_id_support;
  },
  employee_id_active(state) {
    return state.employee_id_active;
  },
}

export const actions = {
  async fetchEmployee({commit}, requestId) {
    const employee_id = await this.$axios.get('/manager/employee/' + requestId);
    commit('setEmployeeID', employee_id)
  },
  async fetchEmployeeTasks({commit}, requestId) {
    const employee_id_tasks = await this.$axios.get('manager/employee/' + requestId + '/tasks');
    commit('setEmployeeIDTasks', employee_id_tasks)
  },
  async fetchEmployeeSupport({commit}, requestId) {
    const employee_id_support = await this.$axios.get('manager/employee/' + requestId + '/support');
    commit('setEmployeeIDSupport', employee_id_support)
  },
  async fetchEmployeeActive({commit}, {requestId, params}) {
    const employee_id_active = await this.$axios.get('manager/employee/' + requestId + '/active',
      {
        params: params
      });
    commit('setEmployeeIDActive', employee_id_active)
  },
}

export const mutations = {
  setEmployeeID(state, employee_id) {
    state.employee_id = employee_id.data.data;
  },
  setEmployeeIDTasks(state, employee_id_tasks) {
    state.employee_id_tasks = employee_id_tasks.data.data;
  },
  setEmployeeIDSupport(state, employee_id_support) {
    state.employee_id_support = employee_id_support.data.data;
  },
  setEmployeeIDActive(state, employee_id_active) {
    state.employee_id_active = employee_id_active.data.data;
  },
}
