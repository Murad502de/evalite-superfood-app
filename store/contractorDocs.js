export const state = () => (
  {
    documents : [],
  }
)

export const getters = {
  documents ( state )
  {
    return state.documents;
  },
}

export const actions = {
  async getDocuments ( ctx, uuid )
  {
    console.log( 'getDocuments' );
    console.log( uuid );

    const documents = await this.$axios.get( `/dispatcher/contractors/${ uuid }/docs` );

    ctx.commit( 'updateDocuments', documents.data.data );

    console.debug( 'Documents:' ); // FIXME // TODO es muss später entfernt werden
    console.debug( documents ); // FIXME // TODO es muss später entfernt werden
  },

  async createDoc({commit, dispatch}, {clientId, docName, docSlug, docFiles }) {

    await this.$axios.post('/manager/contractor/' + clientId + '/documents/',
      '',
      {
        params: {"document": docName, "slug": docSlug}

      })
      .then((response) => {
        for (let i = 0; i < docFiles.length; i++) {
          if(docFiles[i].media){
            dispatch('loadPhoto',  {clientId: clientId, uuid: response.data.data.uuid, docFile: docFiles[i].media, docSlug: docFiles[i].slug, docName: docFiles[i].name_media});
          }
        }

      })
      .catch((error) => {
        console.log(error);
      });
  },

  async loadPhoto({commit, dispatch}, {clientId, uuid, docFile, docSlug, docName}) {
    let formData = new FormData();
    formData.append("file", docFile);

    await this.$axios.put('/manager/contractor/' + clientId + '/documents/' + uuid + '/uploadImage',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params : {
          slug : docSlug,
          name_media : docName,
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },

}

export const mutations = {
  updateDocuments ( state, documents )
  {
    state.documents = documents;
  },
}
