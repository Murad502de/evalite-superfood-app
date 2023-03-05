export const state = () => ({
  performers: [],
  isDialogOpen : false,
})

export const mutations = {
  setDialog ( state, isDialogOpen )
  {
    state.isDialogOpen = isDialogOpen;
  }
}

export const actions = {
  async setStateDialog( ctx, isDialogOpen )
  {
    ctx.commit( 'setDialog', isDialogOpen );
  }
}

export const getters = {
  isDialogOpen ( state )
  {
    return state.isDialogOpen;
  }
}