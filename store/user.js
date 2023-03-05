export const state = () => ({
  user: {
    settings: {},
    visibility_sections: [],
  },
  password: {
    oldPass: {
      value: null,
    },

    newPass: {
      value: null,
      isValid: false,
    },

    RepeatNewPass: {
      value: null,
      isValid: false,
    },
  },
  userTasks: [],
  searchTasks: [],
  userTasksParams: {},
  validation: {},
  userAuthorizationStatus: null,
});

export const getters = {
  user(state) {
    return state.user;
  },
  password(state) {
    return state.password;
  },
  userTasks(state) {
    return state.userTasks;
  },
  searchTasks(state) {
    return state.searchTasks;
  },
  userTasksParams(state) {
    return state.userTasksParams;
  },
  validation(state) {
    return state.validation;
  },
  userAuthorizationStatus(state) {
    return state.userAuthorizationStatus;
  },
}

export const actions = {
  /* FETCHERS */
  async fetchUser({ commit }) {
    const response = await this.$axios.get('user/my');

    commit('updateUserData', response?.data?.data);
  },
  async fetchUserTasks({ commit, state }, payload = {}) {
    const response = await this.$axios.get(
      'user/my/tasks',

      {
        params: {
          ...state.userTasksParams,
          ...payload.params,

          mode: 'map',
        }
      }
    );

    console.log('fetchUserTasks', response); // DELETE

    commit('updateUserTasks', response?.data?.data);
  },
  async fetchSearchTasks({ commit }, filter) {
    console.debug('fetchSearchTasks', filter); // DELETE

    try {
      const response = await this.$axios.get(
        'user/tasks/search',
        {
          params: {
            ...filter,
            mode: 'map',
          }
        }
      );

      console.debug('fetchSearchTasks[response]', response); // DELETE

      commit('updateSearchTasks', response?.data?.data);

      return response;
    }
    catch (e) {
      return e;
    }
  },

  /* SETTERS */
  async setUserData({ commit }, payload) {
    commit('updateUserData', payload);
  },
  async setUserValidation({ commit }, payload) {
    commit('updateUserValidation', payload);
  },
  async setPasswordStore({ commit }, payload) {
    commit('updatePasswordStore', payload);
  },
  async setUserTasksParams({ commit }, payload = {}) {
    commit('updateUserTasksParams', payload);
  },
  async resetUserWorkTimeDaysStore({ commit, state, }, payload = {}) {
    commit(
      'updateUserData',

      {
        work_times: {
          ...state.user.work_times,
          two: false,
          three: false,
          individual: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        }
      }
    );
  },
  async setUserAuthorizationStatus({ commit, }, { status, }) {
    commit('updateUserAuthorizationStatus', { status });
  },

  /* OTHER ACTIONS */
  async uploadUserData({ state }) {
    return await this.$axios.put('user/settings', state.user);
  },
  async changeUserPassword({ commit }, payload) {
    commit(
      'updatePasswordStore',

      {
        oldPass: {
          value: null,
        },

        newPass: {
          value: null,
          isValid: false,
        },

        RepeatNewPass: {
          value: null,
          isValid: false,
        },
      },
    );

    return await this.$axios.put('auth/change_password', payload);
  },
  async validateUserData({ state }, payload = {}) {
    /* FIRST NAME VALIDATE START */
    if (!(typeof this.$validation.requiredField(state.user.firstname) === 'number')) {
      throw new Error('Поле "имя" обязательно к заполнению');
    }
    /* FIRST NAME VALIDATE END */

    /* MIDDLE NAME VALIDATE START */
    if (!(typeof this.$validation.requiredField(state.user.middlename) === 'number')) {
      throw new Error('Поле "фамилия" обязательно к заполнению');
    }
    /* MIDDLE NAME VALIDATE END */

    /* CITY VALIDATE START */
    if (!(typeof this.$validation.requiredField(state.user.settings.city) === 'number')) {
      throw new Error('Поле "город" обязательно к заполнению');
    }
    /* CITY VALIDATE END */

    /* PHONE VALIDATE START */
    if (!(typeof this.$validation.phoneFormat(state.user.settings.contact_phone) === 'boolean')) {
      throw new Error('Поле "телефон" заполнено некорректно');
    }
    /* PHONE VALIDATE END */

    /* EMAIL VALIDATE START */
    if (!(typeof this.$validation.emailFormat(state.user.settings.contact_email) === 'boolean')) {
      throw new Error('Поле "Email" заполнено некорректно');
    }
    /* EMAIL VALIDATE END */

    /* BANK CARD VALIDATE START */
    if (state.user.settings.type_payment === 'банковская карта') {
      if (!(typeof this.$validation.cardNumberFormat(state.user.settings.bank_card) === 'boolean')) {
        throw new Error('Поле "Номер карты" заполнено некорректно');
      }
    }
    /* BANK CARD VALIDATE END */

    /* INN VALIDATE START */
    console.log('validateUserData: ', typeof this.$validation.innFormat(state.user.settings.inn)); // DELETE

    if (!(typeof this.$validation.innFormat(state.user.settings.inn) === 'boolean')) {
      throw new Error('Поле "ИНН" заполнено некорректно');
    }
    /* INN VALIDATE END */

    /* KPP VALIDATE START */
    if (!(typeof this.$validation.kppFormat(state.user.settings.kpp) === 'boolean')) {
      throw new Error('Поле "КПП" заполнено некорректно');
    }
    /* KPP VALIDATE END */

    /* BIC VALIDATE START */
    if (!(typeof this.$validation.bicFormat(state.user.settings.bik) === 'boolean')) {
      throw new Error('Поле "БИК" заполнено некорректно');
    }
    /* BIC VALIDATE END */

    /* PAYMENT ACCOUNT VALIDATE START */
    if (!(typeof this.$validation.paymentAccountFormat(state.user.settings.payment_account) === 'boolean')) {
      throw new Error('Поле "Расчетный счет" заполнено некорректно');
    }
    /* PAYMENT ACCOUNT VALIDATE END */

    /* CORRESPONDENT ACCOUNT VALIDATE START */
    if (!(typeof this.$validation.correspondentAccountFormat(state.user.settings.correspondent_account) === 'boolean')) {
      throw new Error('Поле "Корреспондентский счёт" заполнено некорректно');
    }
    /* CORRESPONDENT ACCOUNT VALIDATE END */

    /* BANK VALIDATE START */
    if (!(typeof this.$validation.requiredField(state.user.settings.bank) === 'number')) {
      throw new Error('Поле "Банк" обязательно к заполнению');
    }
    /* BANK VALIDATE END */

    /* DOCUMENT SNILS START */
    if (!(typeof this.$validation.requiredField(state.user.settings.document_snils) === 'number')) {
      throw new Error('Поле "СНИЛС" обязательно к заполнению');
    }
    /* DOCUMENT SNILS END */

    /* DOCUMENT INN START */
    if (!(typeof this.$validation.innFormat(state.user.settings.document_inn) === 'boolean')) {
      throw new Error('Поле "Свидетельство ИНН" заполнено некорректно');
    }
    /* DOCUMENT INN END */
  },
}

export const mutations = {
  updateUserData(state, payload) {
    state.user = {
      ...state.user,
      ...payload,
    };
  },
  updateUserValidation(state, payload) {
    state.validation = {
      ...state.validation,
      ...payload,
    };
  },
  updatePasswordStore(state, payload) {
    state.password = {
      ...state.password,
      ...payload,
    };
  },
  updateUserTasks(state, userTasks) {
    state.userTasks = userTasks;
  },
  updateSearchTasks(state, searchTasks) {
    state.searchTasks = searchTasks;
  },
  updateUserTasksParams(state, userTasksParams) {
    state.userTasksParams = userTasksParams;
  },
  updateUserAuthorizationStatus(state, { status, }) {
    state.userAuthorizationStatus = status;
  },
}

