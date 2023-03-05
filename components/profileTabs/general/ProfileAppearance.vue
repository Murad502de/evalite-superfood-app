<template lang="pug">

.profile-appearance
  .wrapper
    .header
      .haupt-titel {{ hauptTitel }}
    .body
      .wrapper__body
        .profile-photo
          uploadPhotoInput.profile-photo__document(
            :title="photoDocuments.profile_photo.title"
            :slug="photoDocuments.profile_photo.slug"
            :params="{ photo : getters().getDocumentMediaBySlug( { slugDocument : PROFILE_PHOTO, slugMedia : PROFILE_PHOTO_MAIN, } ), }"
            @delete_media="handlers().onDeleteMedia( { $event, slugDocument : PROFILE_PHOTO, } )"
            @photo_selected="handlers().onPhotoSelected( { $event, slugDocument : PROFILE_PHOTO, slugMedia : PROFILE_PHOTO_MAIN, } )"
          )
        .profile-cover( v-if="false" )
          selectSingle.profile-cover__list(
            :id="'cover-view'"
            :options="[ 'aa', 'bb', 'cc', 'dd' ]"
            :title="selectTitles.coverTitle"
          )
          .cover-view
            .view-titel {{ selectTitles.viewTitle }}
            .view-block

</template>

<script>

  import { mapActions, mapGetters, } from 'vuex';
  import uploadPhotoInput from '@/components/UI/uploadPhotoInput';
  import selectSingle from '@/components/UI/selectSingle';
  import { PROFILE_PHOTO, PROFILE_PHOTO_MAIN } from '@/constants/';

  export default {

    components : {
      uploadPhotoInput,
      selectSingle,
    },

    data ()
    {
      return {
        hauptTitel : 'Внешний вид профиля',
        photoDocuments : {
          profile_photo : { title : 'Фото профиля', slug : 'profile_photo' }
        },

        selectTitles : {
          coverTitle : 'Обложка',
          viewTitle : 'Просмотр',
        },

        slugs : {
          profile_photo : 'profile_photo',
        },
      }
    },

    computed : {
      ...mapGetters( 'userDocs', [ 'documents', ] ),
      ...mapGetters( 'user', [ 'user', ] ),

      PROFILE_PHOTO ()
      {
        return PROFILE_PHOTO;
      },

      PROFILE_PHOTO_MAIN ()
      {
        return PROFILE_PHOTO_MAIN;
      },
    },

    methods : {
      ...mapActions( 'userDocs', [ 'fetchDocuments', 'deleteDocumentMedia', 'uploadDocumentMedia', 'addDocument', ] ),
      ...mapActions( 'user', [ 'setUserData', ] ),

      getters ()
      {
        return {
          getDocumentBySlug : ( payload = {} ) => {
            console.debug( 'getDocumentBySlug', payload ); // DELETE

            return this.documents.filter( doc => doc.slug === payload.slug );
          },

          getDocumentMediaBySlug : ( payload = {} ) => {
            console.debug( 'getDocumentMediaBySlug', payload ); // DELETE

            let doc = this.getters().getDocumentBySlug( { slug: payload.slugDocument } );

            if ( doc.length )
            {
              let media = doc[ 0 ].media.filter( media => media.slug === payload.slugMedia );

              if ( media.length )
              {
                return media[ 0 ];
              }
              else
              {
                return false;
              }
            }
            else
            {
              return false;
            }
          },
        }
      },

      setters ()
      {
        return {
          setDocumentSnils : ( payload = {} ) => {
            console.log( 'setDocumentSnils', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, document_snils : payload.event } } );
          },

          setDocumentInn : ( payload = {} ) => {
            console.log( 'setDocumentInn', payload ); // DELETE log muss weg

            this.setUserData( { settings : { ...this.user.settings, document_inn : payload.event } } );
          },
        }
      },

      handlers ()
      {
        return {
          onDeleteMedia : ( payload = {} ) => {
            let documentIndex = this.documents.findIndex(
              doc => doc.slug === payload.slugDocument
            );

            this.deleteDocumentMedia(
              {
                uuidDoc : this.documents[ documentIndex ].uuid,
                uuidMedia : payload.$event.uuid,
              }
            ).then(
              () => {
                this.fetchDocuments();
              }
            );
          },

          onPhotoSelected : async ( payload = {} ) => {
            let targetDocument = this.documents.find(
              doc => doc.slug === payload.slugDocument
            );

            console.log( "onPhotoSelected", payload, targetDocument, payload.$event ); // DELETE

            if ( !targetDocument )
            {
              console.log( 'doc not found: ', this.photoDocuments[ payload.slugDocument ] );

              await this.addDocument(
                {
                  "document"    : this.photoDocuments[ payload.slugDocument ].title,
                  "slug"        : this.photoDocuments[ payload.slugDocument ].slug,
                  "count_media" : this.photoDocuments[ payload.slugDocument ].count_media,
                }
              ).then(
                ( response ) => {
                  this.uploadDocumentMedia(
                  {
                    uuidDoc     : response.data.data.uuid,
                    media       : payload.$event.photo,
                    name_media  : payload.$event.photo_name,
                    slug        : payload.slugMedia,
                  }
                  ).then(
                    () => {
                      this.fetchDocuments();
                    }
                  );
                }
              );
            }
            else
            {
              this.uploadDocumentMedia(
              {
                uuidDoc     : targetDocument.uuid,
                media       : payload.$event.photo,
                name_media  : payload.$event.photo_name,
                slug        : payload.slugMedia,
              }
              ).then(
                () => {
                  this.fetchDocuments();
                }
              );
            }
          },

          onChooseProfessionClick : ( payload = {} ) => {
            this.$emit( 'go_to_professions' );
          }
        }
      },

      helpers ()
      {
        return {}
      },

      init (){},

      bindActions (){},
    }
  }

</script>

<style lang="scss">

.profile-appearance
{
  /* OBJECTS STYLES START */
    .wrapper
    {
      padding : 32px;
      background: #F6FBFF;
      border: 1px solid #E2E4E5;
      box-sizing: border-box;
      border-radius: 30px;

      .header {
        margin-bottom: 24px;
      }

      .body
      {
        .wrapper__body
        {
          width: 533px;
        }
      }
    }

    .profile-photo
    {
      margin-bottom: 24px;
    }

    .haupt-titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #263043;
    }

    .profile-cover
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;

      .profile-cover__list
      {
        width: 180px;

        fieldset
        {
          background: #FFFFFF;
          border: 1px solid #E2E4E5;
          box-sizing: border-box;
          border-radius: 4px !important;
        }
      }

      .cover-view
      {
        margin-left: 24px;

        .view-titel
        {
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 20px;
          color: #263043;
          opacity: 0.5;
          margin-bottom: 16px;
        }

        .view-block
        {
          width: 130px;
          height: 44px;
          background: #0082DE;
          opacity: 0.2;
          border-radius: 6px;
        }
      }
    }
  /* OBJECTS STYLES END */

  /* MIXINS STYLES START */
    .v-select__selection.v-select__selection--comma, .v-icon.notranslate.mdi
    {
      color : #000000!important;
    }
  /* MIXINS STYLES END */
}

</style>
