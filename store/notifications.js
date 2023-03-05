export const state = () => ({
  notifications: [],
  read_notifications: [],
  notifications_count: [],

})

export const getters = {
  notifications(state) {
    return state.notifications;
  },
  read_notifications(state) {
    return state.read_notifications;
  },
  notifications_count(state) {
    return state.notifications_count;
  },
}


export const actions = {
  async fetchNotifications({commit}, params) {
    const notifications = await this.$axios.get('/user/notifications', {
      params: params
    });
    commit('setNotifications', notifications)
  },

  async fetchReadNotifications({commit}, params) {
    const read_notifications = await this.$axios.get('/user/notifications', {
      params: params
    });
    commit('setReadNotifications', read_notifications)
  },

  async fetchNotificationsCount({commit}) {
    const notifications = await this.$axios.get('/user/notifications/count');
    commit('setNotificationsCount', notifications)
  },

  async putReadNotifications({commit, dispatch}, body) {
    await this.$axios.put('/user/notifications/read/',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        dispatch('fetchNotifications');
        dispatch('fetchNotificationsCount');
      })
      .catch((error) => {
        console.log(error);
      });
  },

}

export const mutations = {
  setNotifications(state, notifications) {
    state.notifications = notifications.data.data;
  },
  setReadNotifications(state, read_notifications) {
    let read_data = read_notifications.data.data,
        read_data_uuid = [];

    read_data.forEach((element) => {
      read_data_uuid.push(element.uuid);
    })

    state.read_notifications = read_data_uuid;
  },
  setNotificationsCount(state, notifications_count) {
    state.notifications_count = notifications_count.data.data;
  },
}

