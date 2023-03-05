export const state = () => ({
  rqTabsTasksNode: [{
    path: '/tasks',
    name: "Все заявки",
    routeName: "tasks",
    params: {},
    isNode: true,
    isActive: false,
  }],
  rqTabsTasksPinned: [],
  rqTabsTasksNew: [],
});
export const getters = {
  RQ_TABS_TASKS(state) {
    return [
      ...state.rqTabsTasksNode,
      ...state.rqTabsTasksPinned,
      ...state.rqTabsTasksNew,
    ];
  }
};
export const actions = {
  async addRqTabsTaskNew({ commit, state, }, { route }) {
    console.debug('addRqTabsTaskNew', route); // DELETE

    const rqTabsTasksPinnedFiltered = state.rqTabsTasksPinned.filter(
      tabPinned => tabPinned.params.id === route.params.id
    );

    if (!rqTabsTasksPinnedFiltered.length) {
      commit('updateRqTabsTasksNew', [{
        path: route.path,
        name: route.meta.title,
        routeName: route.name,
        params: route.params,
        isPinned: false,
        isActive: true,
      }]);
    }
  },
  async deleteRqTabsTaskNew({ commit }, { }) {
    console.debug('addRqTabsTaskNew'); // DELETE
  },
  async addRqTabsTaskPinned({ commit }, { }) {
    console.debug('addRqTabsTaskPinned'); // DELETE
  },
  async deleteRqTabsTaskPinned({ commit }, { }) {
    console.debug('deleteRqTabsTaskPinned'); // DELETE
  },
  async setRqTabsTaskActive({ commit, state, getters, }, { route }) {
    console.debug('setRqTabsTaskActive', route); // DELETE

    const rqTabTasks = getters.RQ_TABS_TASKS.find(
      tab => tab.path === route.path
    );

    if (!rqTabTasks) return;

    if (rqTabTasks.isNode) {
      commit('updateRqTabsTasksNode', [{
        ...state.rqTabsTasksNode[0],
        isActive: true,
      }]);
      commit('updateRqTabsTasksPinned', state.rqTabsTasksPinned.map(
        (tabPinned) => ({
          ...tabPinned,
          isActive: false,
        })
      ));
      commit(
        'updateRqTabsTasksNew',
        state.rqTabsTasksNew.length
        ? [{
          ...state.rqTabsTasksNew[0],
          isActive: false,
        }]
        : []
      );
    } else if (rqTabTasks.isPinned) {
      commit('updateRqTabsTasksNode', [{
        ...state.rqTabsTasksNode[0],
        isActive: false,
      }]);
      commit('updateRqTabsTasksPinned', state.rqTabsTasksPinned.map((tabPinned) => {
        if (tabPinned.path === rqTabTasks.path) {
          return {
            ...tabPinned,
            isActive: true,
          }
        } else {
          return {
            ...tabPinned,
            isActive: false,
          }
        }
      }));
      commit(
        'updateRqTabsTasksNew',
        state.rqTabsTasksNew.length
        ? [{
          ...state.rqTabsTasksNew[0],
          isActive: false,
        }]
        : []
      );
    } else {
      commit('updateRqTabsTasksNode', [{
        ...state.rqTabsTasksNode[0],
        isActive: false,
      }]);
      commit('updateRqTabsTasksPinned', state.rqTabsTasksPinned.map(
        (tabPinned) => ({
          ...tabPinned,
          isActive: false,
        })
      ));
      commit(
        'updateRqTabsTasksNew',
        state.rqTabsTasksNew.length
        ? [{
          ...state.rqTabsTasksNew[0],
          isActive: true,
        }]
        : []
      );
    }
  },

  async pinRqTabTasks({ commit, state, }, { rqTabTasks, }) {
    console.debug('pinRqTabTasks', rqTabTasks); // DELETE

    commit('updateRqTabsTasksPinned', [
      ...state.rqTabsTasksPinned,
      {
        ...state.rqTabsTasksNew[0],
        isPinned: true,
      },
    ]);
    commit('updateRqTabsTasksNew', []);
  },
  async unPinRqTabTasks({ commit, state, }, { rqTabTasks, }) {
    console.debug('unPinRqTabTasks', rqTabTasks); // DELETE

    commit('updateRqTabsTasksPinned', state.rqTabsTasksPinned.filter(
      (tabPinned) => {
        if (tabPinned.path === rqTabTasks.path) {
          commit('updateRqTabsTasksNew', [{
            ...tabPinned,
            isPinned: false,
            isActive: true,
          }]);

          return false;
        } else {
          return {
            ...tabPinned,
            isActive: false,
          };
        }
      }
    ));

    return state.rqTabsTasksNew[0].path;
  },
  async closeRqTabTasks({ commit, state, getters, }) {
    console.debug('closeRqTabTasks'); // DELETE

    commit('updateRqTabsTasksNew', []);
    commit('updateRqTabsTasksPinned', state.rqTabsTasksPinned.map(
      (tabPinned, iTabPinned) => {
        if (iTabPinned === state.rqTabsTasksPinned.length - 1) {
          return {
            ...tabPinned,
            isActive: true,
          }
        } else {
          return {
            ...tabPinned,
          };
        }
      }
    ));

    return getters.RQ_TABS_TASKS[getters.RQ_TABS_TASKS.length - 1].path;
  },
};
export const mutations = {
  updateRqTabsTasksNode(state, rqTabsTasksNode) {
    state.rqTabsTasksNode = rqTabsTasksNode;
  },
  updateRqTabsTasksPinned(state, rqTabsTasksPinned) {
    state.rqTabsTasksPinned = rqTabsTasksPinned;
  },
  updateRqTabsTasksNew(state, rqTabsTasksNew) {
    state.rqTabsTasksNew = rqTabsTasksNew;
  },
};

