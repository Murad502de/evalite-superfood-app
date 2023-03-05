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
  async fetchDocuments ( { commit } )
  {
    console.debug( 'fetchDocuments' ); // DELETE

    const documents = await this.$axios.get( `user/documents` );

    commit( 'updateDocuments', documents.data.data );

    console.debug( 'Documents: ', documents ); // DELETE
  },

  async addDocument ( { commit }, payload )
  {
    console.debug( 'addDocument', payload ); // DELETE

    return await this.$axios.post( `user/documents`, payload );
  },

  async deleteDocumentMedia ( { actions, }, payload )
  {
    await this.$axios.delete( `user/documents/${ payload.uuidDoc }/image/${ payload.uuidMedia }` );
  },

  async uploadDocumentMedia ( { commit, }, payload )
  {
    await this.$axios.put(
      `user/documents/${ payload.uuidDoc }/uploadImage`,

      payload.media,

      {
        params : {
          slug : payload.slug,
          name_media : payload.name_media,
        }
      }
    );
  },
}

export const mutations = {
  updateDocuments ( state, documents )
  {
    state.documents = documents;
  },
}
