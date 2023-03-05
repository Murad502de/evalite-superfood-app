<template lang="pug">

.documents-tab__container
  .documents-tab__wrapper
    .documents-tab__header
      .documents-tab__haupt-titel {{ hauptTitel }}
    .documents-tab__body
      .documents-tab__wrapper__body
        .photo-documents.passport
          uploadPhotoInput.photo-document.passport_main_spread(
            :title="photoDocuments.passport_main_spread.title"
            :slug="photoDocuments.passport_main_spread.slug"
            :params="{ photo : getters().getDocumentMediaBySlug( { slugDocument : PASSPORT, slugMedia : PASSPORT_MAIN_SPREAD, } ), }"
            @delete_media="handlers().onDeleteMedia( { $event, slugDocument : PASSPORT, } )"
            @photo_selected="handlers().onPhotoSelected( { $event, slugDocument : PASSPORT, slugMedia : PASSPORT_MAIN_SPREAD, } )"
          )
          uploadPhotoInput.photo-document.passport_registration_page(
            :title="photoDocuments.passport_registration_page.title"
            :slug="photoDocuments.passport_registration_page.slug"
            :params="{ photo : getters().getDocumentMediaBySlug( { slugDocument : PASSPORT, slugMedia : PASSPORT_REGISTRATION_PAGE, } ), }"
            @delete_media="handlers().onDeleteMedia( { $event, slugDocument : PASSPORT, } )"
            @photo_selected="handlers().onPhotoSelected( { $event, slugDocument : PASSPORT, slugMedia : PASSPORT_REGISTRATION_PAGE, } )"
          )
          uploadPhotoInput.photo-document.photo_with_passport(
            :title="photoDocuments.photo_with_passport.title"
            :slug="photoDocuments.photo_with_passport.slug"
            :params="{ photo : getters().getDocumentMediaBySlug( { slugDocument : PASSPORT, slugMedia : PHOTO_WITH_PASSPORT, } ), }"
            @delete_media="handlers().onDeleteMedia( { $event, slugDocument : PASSPORT, } )"
            @photo_selected="handlers().onPhotoSelected( { $event, slugDocument : PASSPORT, slugMedia : PHOTO_WITH_PASSPORT, } )"
          )
          Input.photo-document.photo_with_passport.mix-input(
            :params="{ ...textInputDefaultSettings, hauptTitel : photoDocuments.document_snils.title, value : user.settings.document_snils, }"
            @input_change="setters().setDocumentSnils( { event : $event } )"
          )
          Input.photo-document.photo_with_passport.mix-input(
            :params="{ ...textInputDefaultSettings, hauptTitel : photoDocuments.document_inn.title, value : user.settings.document_inn, }"
            @input_change="setters().setDocumentInn( { event : $event } )"
          )
        .additional-documents-container
          .documents-tab__haupt-titel.additional-docs__title {{ hauptTitelAdditionalDocs }}
          .documents-tab__description.additional-docs__description {{ additionalDocsDescription }}
          .additional-docs__professions
            .additional-docs__profession(
              v-for="profession in user.professions" :key="profession.uuid"
            )
              .additional-docs__profession__wrapper
                .profession__name {{ profession.name }}
          .additional-docs__info-block
            .additional-docs__info-block__wrapper
              .info-block__icon
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H11V7H9V5ZM9 9H11V15H9V9ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="#7A91A9"/>
                </svg>
              .info-block__content
                .info-block__text {{ additionalDocsInfo }}
                .info-block__action( @click="handlers().onChooseProfessionClick()" ) {{ additionalDocsActionText }}
          .photo-documents.additional-documents__list
            uploadPhotoInput.photo-document.photo_with_passport(
              :title="photoDocuments.medical_book.title"
              :sub_title="errorReport"
              :slug="photoDocuments.medical_book.slug"
              :params="{ photo : getters().getDocumentMediaBySlug( { slugDocument : MEDICAL_BOOK, slugMedia : MEDICAL_BOOK_MAIN_SPREAD, } ), }"
              @delete_media="handlers().onDeleteMedia( { $event, slugDocument : MEDICAL_BOOK, } )"
              @photo_selected="handlers().onPhotoSelected( { $event, slugDocument : MEDICAL_BOOK, slugMedia : MEDICAL_BOOK_MAIN_SPREAD, } )"
            )
            uploadPhotoInput.photo-document.photo_with_passport(
              :title="photoDocuments.medical_book_1.title"
              :sub_title="errorReport"
              :slug="photoDocuments.medical_book_1.slug"
              :params="{ photo : getters().getDocumentMediaBySlug( { slugDocument : MEDICAL_BOOK, slugMedia : MEDICAL_BOOK_PAGE_1, } ), }"
              @delete_media="handlers().onDeleteMedia( { $event, slugDocument : MEDICAL_BOOK, } )"
              @photo_selected="handlers().onPhotoSelected( { $event, slugDocument : MEDICAL_BOOK, slugMedia : MEDICAL_BOOK_PAGE_1, } )"
            )
            uploadPhotoInput.photo-document.photo_with_passport(
              :title="photoDocuments.medical_book_2.title"
              :sub_title="errorReport"
              :slug="photoDocuments.medical_book_2.slug"
              :params="{ photo : getters().getDocumentMediaBySlug( { slugDocument : MEDICAL_BOOK, slugMedia : MEDICAL_BOOK_PAGE_2, } ), }"
              @delete_media="handlers().onDeleteMedia( { $event, slugDocument : MEDICAL_BOOK, } )"
              @photo_selected="handlers().onPhotoSelected( { $event, slugDocument : MEDICAL_BOOK, slugMedia : MEDICAL_BOOK_PAGE_2, } )"
            )
            uploadPhotoInput.photo-document.photo_with_passport(
              :title="photoDocuments.medical_book_3.title"
              :sub_title="errorReport"
              :slug="photoDocuments.medical_book_3.slug"
              :params="{ photo : getters().getDocumentMediaBySlug( { slugDocument : MEDICAL_BOOK, slugMedia : MEDICAL_BOOK_PAGE_3, } ), }"
              @delete_media="handlers().onDeleteMedia( { $event, slugDocument : MEDICAL_BOOK, } )"
              @photo_selected="handlers().onPhotoSelected( { $event, slugDocument : MEDICAL_BOOK, slugMedia : MEDICAL_BOOK_PAGE_3, } )"
            )
            uploadPhotoInput.photo-document.photo_with_passport(
              :title="photoDocuments.stacker_driving_license_main_spread.title"
              :sub_title="errorReport"
              :slug="photoDocuments.stacker_driving_license_main_spread.slug"
              :params="{ photo : getters().getDocumentMediaBySlug( { slugDocument : STACKER_DRIVING_LICENSE, slugMedia : STACKER_DRIVING_LICENSE_MAIN_SPREAD, } ), }"
              @delete_media="handlers().onDeleteMedia( { $event, slugDocument : STACKER_DRIVING_LICENSE, } )"
              @photo_selected="handlers().onPhotoSelected( { $event, slugDocument : STACKER_DRIVING_LICENSE, slugMedia : STACKER_DRIVING_LICENSE_MAIN_SPREAD, } )"
            )

</template>

<script>

  import { mapActions, mapGetters, } from 'vuex';
  import uploadPhotoInput from '@/components/UI/uploadPhotoInput';
  import Input from '@/components/UI/input';
  import {
    PASSPORT,
    PASSPORT_MAIN_SPREAD,
    PASSPORT_REGISTRATION_PAGE,
    PHOTO_WITH_PASSPORT,
    MEDICAL_BOOK,
    MEDICAL_BOOK_MAIN_SPREAD,
    MEDICAL_BOOK_PAGE_1,
    MEDICAL_BOOK_PAGE_2,
    MEDICAL_BOOK_PAGE_3,
    STACKER_DRIVING_LICENSE,
    STACKER_DRIVING_LICENSE_MAIN_SPREAD,
  } from '@/constants/';

  export default {

    components : {
      uploadPhotoInput,
      Input,
    },

    props : {},

    data ()
    {
      return {
        hauptTitel : 'Фото документов',
        hauptTitelAdditionalDocs : 'Дополнительные документы',
        additionalDocsDescription : 'Следующий перечень документов требуется для участия в заявках по выбранных Вами профессиям:',

        photoDocuments : {
          passport                    : { title : 'Паспорт', slug  : 'passport', count_media : 3 },
          passport_main_spread        : { title : 'Паспорт - основной разворот', slug  : 'passport_main_spread', },
          passport_registration_page  : { title : 'Паспорт - страница регистрации', slug  : 'passport_registration_page', },
          photo_with_passport         : { title : 'Фото с паспортом', slug  : 'photo_with_passport', },

          document_snils              : { title : 'СНИЛС', slug  : 'document_inn', },
          document_inn                : { title : 'Свидетельство ИНН', slug  : 'document_inn', },

          medical_book                : { title : 'Медицинская книжка', slug  : 'medical_book', count_media : 3 },
          medical_book_1              : { title : 'Медицинская книжка - доп. страница 1', slug  : 'medical_book_1', },
          medical_book_2              : { title : 'Медицинская книжка - доп. страница 2', slug  : 'medical_book_2', },
          medical_book_3              : { title : 'Медицинская книжка - доп. страница 3', slug  : 'medical_book_3', },
          medical_book_main_spread    : { title : 'Медицинская книжка - основной разворот', slug  : 'medical_book_main_spread', },

          stacker_driving_license             : { title : 'Права на управление штабелером', slug  : 'stacker_driving_license', count_media : 1 },
          stacker_driving_license_main_spread : { title : 'Права на управление штабелером  - основной разворот', slug  : 'stacker_driving_license_main_spread', },
        },

        textInputDefaultSettings : {
          type : 'text',
          value : '',
          hauptTitel : '',
          solo : true,
          hint : '',
        },

        additionalDocsInfo : 'Если вы не готовы сейчас предоставить документы нужные для работы по этим профессиям, вы можете вернуться к выбору профессий, изменить свой выбор и продолжить регистрацию.',

        additionalDocsActionText : 'Перейти к выбору профессий',

        errorReport : 'Сообщение об ошибке',
      }
    },

    computed : {
      ...mapGetters( 'userDocs', [ 'documents', ] ),
      ...mapGetters( 'user', [ 'user', ] ),

      PASSPORT ()
      {
        return PASSPORT;
      },

      PASSPORT_MAIN_SPREAD ()
      {
        return PASSPORT_MAIN_SPREAD;
      },

      PASSPORT_REGISTRATION_PAGE ()
      {
        return PASSPORT_REGISTRATION_PAGE;
      },

      PHOTO_WITH_PASSPORT ()
      {
        return PHOTO_WITH_PASSPORT;
      },

      MEDICAL_BOOK ()
      {
        return MEDICAL_BOOK;
      },

      MEDICAL_BOOK_MAIN_SPREAD ()
      {
        return MEDICAL_BOOK_MAIN_SPREAD;
      },

      MEDICAL_BOOK_PAGE_1 ()
      {
        return MEDICAL_BOOK_PAGE_1;
      },

      MEDICAL_BOOK_PAGE_2 ()
      {
        return MEDICAL_BOOK_PAGE_2;
      },

      MEDICAL_BOOK_PAGE_3 ()
      {
        return MEDICAL_BOOK_PAGE_3;
      },

      STACKER_DRIVING_LICENSE ()
      {
        return STACKER_DRIVING_LICENSE;
      },

      STACKER_DRIVING_LICENSE_MAIN_SPREAD ()
      {
        return STACKER_DRIVING_LICENSE_MAIN_SPREAD;
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
              console.log( 'doc not found: ', this.photoDocuments[ payload.slugDocument ] ); // DELETE

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

      init ()
      {},

      bindActions (){},
    },

    mounted ()
    {
      this.init();
    },
  }

</script>

<style lang="scss">

.documents-tab__container
{
  /* OBJECTS STYLES START */
    .documents-tab__wrapper
    {
      padding : 32px;
      background: #F6FBFF;
      border: 1px solid #E2E4E5;
      box-sizing: border-box;
      border-radius: 30px;

      .documents-tab__header {
        margin-bottom: 24px;
      }

      .documents-tab__body
      {
        .documents-tab__wrapper__body
        {
          width: 533px;
        }
      }
    }

    .documents-tab__haupt-titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #263043;
    }

    .documents-tab__description
    {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      color: #7A91A9;
      margin-bottom: 24px;
    }

    .additional-docs__description
    {
      margin-top: 16px;
    }

    .photo-document
    {
      margin-bottom: 24px;
      width: 415px;

      .upload-photo__sub-titel
      {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        color: #EB4D3D;
        margin-top: 10px;
        cursor: pointer;
        user-select: none;

        &:active
        {
          color: #a72112;
        }
      }
    }

    .additional-docs__professions
    {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: center;

      margin-left: -10px;
      margin-top: -10px;
    }

    .additional-docs__profession
    {
      background: #FFFFFF;
      border: 1px solid #DADADA;
      box-sizing: border-box;
      border-radius: 19px;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 6px 16px;

      width: max-content;

      margin-left: 10px;
      margin-top: 10px;

      // &:first-child
      // {
      //   margin-left: 0;
      // }

      .additional-docs__profession__wrapper
      {
        .profession__name
        {
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 125%;
          color: #263043;
        }
      }
    }

    .additional-docs__info-block
    {
      padding: 22px 26px 24px 20px;
      background: #FFFFFF;
      border: 1px solid #EBEBEB;
      box-sizing: border-box;
      border-radius: 16px;

      margin-top: 32px;

      .additional-docs__info-block__wrapper
      {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: flex-start;
        align-items: flex-start;

        .info-block__icon
        {}

        .info-block__content
        {
          padding-left: 8px;
          font-family: Source Sans Pro;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 18px;

          color: #263043;

          .info-block__text
          {}

          .info-block__action
          {
            margin-top: 16px;
            font-weight: 600;
            color: #0082DE;
            user-select: none;
            cursor: pointer;

            &:active
            {
              color: #035a99;
            }
          }
        }
      }
    }

    .additional-documents__list
    {
      margin-top: 32px;
    }
  /* OBJECTS STYLES END */

  /* MIXINS STYLES START */
    .mix-input
    {
      .v-input__control
      {
        height: 48px;

        .v-input__slot
        {
          margin: 0 !important;
          box-shadow: none !important;

          height: 48px;
          background: #FFFFFF;
          border: 1px solid #E2E4E5;
          box-sizing: border-box;
          border-radius: 4px;
        }
      }
    }
  /* MIXINS STYLES END */
}

</style>
