export const state = () => ({

});
export const getters = {

};
export const actions = {
    async signIn({ commit }, params) {
        await this.$axios
            .post("auth/login", {
                phone_or_email: params.phone_or_email,
                password: params.password,
            })
            .then((response) => {
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
}
export const mutations = {

}
