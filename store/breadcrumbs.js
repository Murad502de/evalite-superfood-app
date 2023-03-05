export const state = () => ({
  breadcrumbs: [],

})

export const getters = {
  BREADCRUMBS(state) {
    return state.breadcrumbs;
  },
}


export const actions = {
  async setBreadcrumbs({ commit }, { crumbs }) {
    //console.debug('setBreadcrumbs', crumbs);

    commit('updateBreadcrumbs', crumbs);
  },
  async initBreadcrumbs({ commit }, fullPath) {
    //console.debug('initBreadcrumbs', fullPath);

    const params_r = fullPath.startsWith('/')
      ? fullPath.substring(1).split('/')
      : fullPath.split('/');

    const crumbs = [];

    let path = '';

    await params_r.forEach((param, index) => {
      path = `${path}/${param}`;
      //console.log('path ---', path)
      const match = this.$router.match(path);

      let title = match.meta.title;
      if (match.name !== null) {
        crumbs.push({
          text: title,
          href: match.path
        })
      }

      if (match.path.includes('edit') || match.path.includes('timesheet')) {
        crumbs[index - 1].text = match.meta.pre_title;
      }

    });

    commit('updateBreadcrumbs', crumbs);
  },
}

export const mutations = {
  updateBreadcrumbs(state, breadcrumbs) {
    state.breadcrumbs = breadcrumbs;
  },
}

