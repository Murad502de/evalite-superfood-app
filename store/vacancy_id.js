export const state = () => ({
  vacancy_id: {},
})

export const getters = {
  vacancy_id(state) {
    return state.vacancy_id;
  },
}


export const actions = {
  async fetchVacancyId({commit}, {objectId, VacancyId}) {
    const vacancy_id = await this.$axios.get('/objects/' + objectId +'/vacancies/' + VacancyId);
    commit('setVacancy', vacancy_id);
  },
  async createVacancy({commit, dispatch}, {newRequest, object_uuid}) {
    let self= this;
    console.log(newRequest, object_uuid);
    commit('response/setAwait', null, { root: true });
    const requests = await this.$axios.post('/objects/' + object_uuid + '/vacancies',
      newRequest,
      {
        headers: {
          'Content-Type': 'application/json',
        },

      })
      .then((response) => {
        console.log(response);
        commit('response/setSuccess', {type: 'success', text: 'Услуга успешно создана', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
        console.log('/objects/' + object_uuid + '/vacancy/' + response.data.uuid);
        self.$router.push('/objects/' + object_uuid + '/vacancy/' + response.data.uuid);

      })
      .catch((error) => {
        commit('response/setSuccess', {type: 'error', text: 'Заполните поля формы', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 3000);
        console.log(error);
      });

  },
  async putVacancy({commit, dispatch}, {body, object_uuid, vacancy_uuid, isClose}) {
    let self= this;
    await this.$axios.put('/objects/' + object_uuid + '/vacancies/' + vacancy_uuid,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        dispatch('fetchVacancyId');
        commit('response/setSuccess', {type: 'success', text: 'Услуга успешно обновлена', }, {root: true});
        setTimeout(function() {
          commit('response/removeSuccess', null, { root: true });
        }, 2000);
        if(isClose){
          setTimeout(function() {
            self.$router.push('/objects/'+object_uuid);
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async removeVacancy({commit, dispatch}, {object_uuid, uuid}) {

    await this.$axios.delete('/objects/' + object_uuid + '/vacancies',{
      headers: { 'Content-Type': 'application/json', },
      data: uuid
      })
      .then((response) => {
        console.log(response);
        dispatch('object_id/fetchObjectIdVacancies', {requestId:object_uuid, params:{}, concat: false, unit: false}, {root: true});
      })
      .catch((error) => {
        console.log(error);
      });

  },
}

export const mutations = {
  setVacancy(state, vacancy_id) {
    state.vacancy_id = vacancy_id.data.data;
  },

}


