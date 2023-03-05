export const state = () => ({
  executors: [],
  specializations: [],
  document: "",
  passport_media: "",
  medical_media: "",
  driver_media: "",
  error: "",
  passport_main_spread: null,
  phone_or_email: "",
  recover_sms_phone: ''
});
export const getters = {
  specializations(state) {
    return state.specializations;
  },
  recover_sms_phone(state) {
    return state.recover_sms_phone;
  },
};
export const actions = {
  async createExecutor({ commit }, params) {
    await this.$axios
      .post("auth/signup", {
        lastname: params.name,
        firstname: params.surname,
        middlename: params.middle_name,
        phone: params.phone,
        birthday: params.birth_date,
        gender: params.sex,
        email: params.email,
        type: "contractor",
      })
      .then((response) => {
        commit(
          "response/setSuccess",
          { type: "success", text: "Исполнитель успешно создан" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        commit(
          "response/setSuccess",
          { type: "error", text: "Заполните поля" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 3000);
        console.log(error);
      });
  },
  async signIn({ commit }, params) {
    await this.$axios
      .post("auth/login", {
        phone_or_email: params.phone_or_email,
        password: params.password,
      })
      .then((response) => {
        commit("SET_SIGN_IN", params.phone_or_email);
        commit(
          "response/setSuccess",
          { type: "success", text: "Исполнитель успешно зашел" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        commit(
          "response/setSuccess",
          { type: "error", text: "Заполните поля" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 3000);
        console.log(error);
      });
  },
  async recoverExecutorPhone({ commit }, params) {
    await this.$axios
        .post("auth/signup", {
          phone: params,
          type: "contractor",
        })
        .then((response) => {
          commit('SET_PHONE_RECOVER',params)
          commit(
              "response/setSuccess",
              { type: "success", text: "Исполнитель успешно создан" },
              { root: true }
          );
          setTimeout(function () {
            commit("response/removeSuccess", null, { root: true });
          }, 2000);
        })
        .catch((error) => {
          commit(
              "response/setSuccess",
              { type: "error", text: "Заполните поля" },
              { root: true }
          );
          setTimeout(function () {
            commit("response/removeSuccess", null, { root: true });
          }, 3000);
          console.log(error);
        });
  },
  async confirmPassword({ commit }, params) {
    await this.$axios
      .put("auth/confirm", params)
      .then((response) => {
        commit(
          "response/setSuccess",
          { type: "success", text: "Исполнитель успешно создан" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        commit(
          "response/setSuccess",
          { type: "error", text: "Заполните поля" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 3000);
        console.log(error);
      });
  },
  async sigInInConfirmPassword({ commit, state }, params) {
    await this.$axios
      .put("auth/confirm", {
        phone: state.recover_sms_phone,
        code_confirm: params,
      })
      .then((response) => {
        commit(
          "response/setSuccess",
          { type: "success", text: "Исполнитель успешно создан" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 2000);
      })
      .catch((error) => {
        commit(
          "response/setSuccess",
          { type: "error", text: "Заполните поля" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 3000);
        console.log(error);
      });
  },
  async createPassword({ commit }, params) {
    console.log(params);
    await this.$axios
      .put("auth/password", params)
      .then((response) => {
        commit(
          "response/setSuccess",
          { type: "success", text: "Пароль успешно создан" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 2000);
        return (response && response.data) || {};
      })
      .catch((error) => {
        commit(
          "response/setSuccess",
          { type: "error", text: "Заполните поля" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 3000);
        console.log(error);
        return error;
      });
  },
  async loadSpecializations({ commit }) {
    await this.$axios
      .get("dictionary/specializations")
      .then((response) => {
        commit("SET_SPECIALIZATIONS", response);
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 2000);
        return (response && response.data) || {};
      })
      .catch((error) => {
        commit(
          "response/setSuccess",
          { type: "error", text: "Заполните поля" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 3000);
        console.log(error);
        return error;
      });
  },
  async setSpecializations({ commit }, params) {
    console.log(params);
    await this.$axios
      .put("user/settings", { professions: { ...params } })
      .then((response) => {
        commit(
          "response/setSuccess",
          { type: "success", text: "Специализации успешно созданы" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 2000);
        return (response && response.data) || {};
      })
      .catch((error) => {
        commit(
          "response/setSuccess",
          { type: "error", text: "Заполните поля" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 3000);
        console.log(error);
        return error;
      });
  },
  async createDocument({ commit }, params) {
    console.log(params);
    await this.$axios
      .post("user/documents", params)
      .then((response) => {
        if (params === "document") {
          commit("SET_DOCUMENT", response);
        } else if (params === "passport_media") {
          commit("SET_PASSPORT_MEDIA", response);
        } else if (params === "medical_media") {
          commit("SET_MEDICAL_MEDIA", response);
        } else if (params === "driver_media") {
          commit("SET_DRIVER_MEDIA", response);
        }
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 2000);
        return (response && response.data) || {};
      })
      .catch((error) => {
        commit(
          "response/setSuccess",
          { type: "error", text: "Заполните поля" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 3000);
        console.log(error);
        return error;
      });
  },
  async setPassport({ commit, state }, params) {
    console.log(state.document);
    await this.$axios
      .post(`user/documents/${state.document}`, params)
      .then((response) => {
        commit(
          "response/setSuccess",
          { type: "success", text: "Паспортные данные успешно созданы" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 2000);
        return (response && response.data) || {};
      })
      .catch((error) => {
        commit(
          "response/setSuccess",
          { type: "error", text: "Заполните поля" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 3000);
        console.log(error);
        return error;
      });
  },
  async uploadPassportMainSpread({ commit, state }, payload) {
    console.log(payload, "file");
    await this.$axios
      .put(
        `user/documents/${state.passport_media}/uploadImage`,
        payload.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: payload.params,
        }
      )
      .then((response) => {
        commit(
          "response/setSuccess",
          { type: "success", text: "Платежная информация успешно создана" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 2000);
        return (response && response.data) || {};
      })
      .catch((error) => {
        commit(
          "response/setSuccess",
          { type: "error", text: "Заполните поля" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 3000);
        console.log(error);
        return error;
      });
  },
  async uploadPassportMedical({ commit, state }, payload) {
    await this.$axios
      .put(
        `user/documents/${state.medical_media}/uploadImage`,
        payload.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: payload.params,
        }
      )
      .then((response) => {
        commit(
          "response/setSuccess",
          { type: "success", text: "Платежная информация успешно создана" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 2000);
        return (response && response.data) || {};
      })
      .catch((error) => {
        commit(
          "response/setSuccess",
          { type: "error", text: "Заполните поля" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 3000);
        console.log(error);
        return error;
      });
  },
  async uploadDriverLicense({ commit, state }, payload) {
    await this.$axios
      .put(
        `user/documents/${state.driver_media}/uploadImage`,
        payload.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: payload.params,
        }
      )
      .then((response) => {
        commit(
          "response/setSuccess",
          { type: "success", text: "Платежная информация успешно создана" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 2000);
        return (response && response.data) || {};
      })
      .catch((error) => {
        commit(
          "response/setSuccess",
          { type: "error", text: "Заполните поля" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 3000);
        console.log(error);
        return error;
      });
  },
  async setPayment({ commit }, params) {
    await this.$axios
      .put(`user/settings`, {
        settings: {
          inn: params.inn,
          bik: params.bik,
          bank: params.bank,
          type_payment: params.type_payment,
          payment_fullname: params.payment_fullname,
          payment_account: params.payment_account,
          location_address: "fewfew",
        },
      })
      .then((response) => {
        commit(
          "response/setSuccess",
          { type: "success", text: "Платежная информация успешно создана" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 2000);
        return (response && response.data) || {};
      })
      .catch((error) => {
        commit(
          "response/setSuccess",
          { type: "error", text: "Заполните поля" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 3000);
        console.log(error);
        return error;
      });
  },
  async setAddress({ commit }, params) {
    await this.$axios
      .put(`user/settings`, { addresses: [...params] })
      .then((response) => {
        commit(
          "response/setSuccess",
          { type: "success", text: "Адресс успешно создан" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 2000);
        return (response && response.data) || {};
      })
      .catch((error) => {
        commit(
          "response/setSuccess",
          { type: "error", text: "Заполните поля" },
          { root: true }
        );
        setTimeout(function () {
          commit("response/removeSuccess", null, { root: true });
        }, 3000);
        console.log(error);
        return error;
      });
  },
};
export const mutations = {
  SET_SPECIALIZATIONS(state, payload) {
    state.specializations = payload.data.data;
  },
  SET_PHONE_RECOVER(state,payload){
    state.recover_sms_phone = payload
  },
  SET_SIGN_IN(state, payload) {
    state.phone_or_email = payload;
  },
  SET_DOCUMENT(state, payload) {
    state.document = payload.data.uuid;
  },
  SET_PASSPORT_MEDIA(state, payload) {
    if (state.passport_media.length < 1) {
      state.passport_media = payload.data.uuid;
    }
  },
  SET_MEDICAL_MEDIA(state, payload) {
    if (state.medical_media.length < 1) {
      state.medical_media = payload.data.uuid;
    }
  },
  SET_DRIVER_MEDIA(state, payload) {
    if (state.driver_media.length < 1) {
      state.driver_media = payload.data.uuid;
    }
  },
};
