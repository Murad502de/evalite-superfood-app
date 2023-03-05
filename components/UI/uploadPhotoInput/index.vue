<template lang="pug">

.upload-photo-input
  .upload-photo__haupt-titel {{ title }}
  .eingabe( v-if="!helpers().hasPhoto()" )
    .upload-btn
      .logo
        img.upload_profile_photo( src="@/assets/img/upload_profile_photo.svg" )
      .btn( @click="handlers().uploadFile()" )
        .btn__title {{ titles.upload_btn }}
    .upload-status
      .file-name( v-show="upload_status" ) {{ selectedFileName }}
      .file-name-default( v-show="!upload_status" ) {{ titles.upload_status_default }}
  .eingabe.preview-mode(v-else)
    .eingabe__preview
      .preview__photo
        .photo__img
          img.photo__img_item(
            :src="params.photo.preview_url"
            @click="handlers().onPreviewClick( { photo : params.photo } )"
          )
        .photo__name
          .name__title {{ params.photo.name_media }}
      .preview__actions
        .action.delete(
          @click="handlers().onActionDeleteClick( { uuid : params.photo.uuid } )"
        ) {{ 'Удалить' }}
  input.picture-upload(
    type="file"
    :id="input_id"
    tabindex="-1"
    name="file"
    :ref="input_id"
    @change="handlers().uploadPicture()"
  )
  .upload-photo__sub-titel {{ sub_title }}

</template>

<script>

  export default {
    components : {},

    props : {
      title : {
        type : String,
        default : "",
      },

      sub_title : {
        type : String,
        default : "",
      },

      slug : {
        type : String,
        required : true,
      },

      params : {
        type : Object,
        required : false,
      },
    },

    data ()
    {
      return {
        titles : {
          upload_btn : 'Загрузить фото',
          upload_status_default : 'Фото не установлено',
        },

        upload_status : false,
        selectedFile : '',
        selectedFileName : '',
      }
    },

    computed : {
      input_id ()
      {
        return `upload_${ this.slug }`;
      },
    },

    methods : {
      getters ()
      {
        return {}
      },

      setters ()
      {
        return {
          setUploadStatus : ( payload = {} ) => {
            console.log( 'setUploadStatus', this, 'file name', this.$refs[ this.input_id ]?.files[ 0 ]?.name );

            this.upload_status = this.$refs[ this.input_id ]?.files[ 0 ]?.name ? true : false;

            this.setters().setSelectedFileName();
          },

          setSelectedFileName : ( payload = {} ) => {
            this.selectedFileName = this.$refs[ this.input_id ]?.files[ 0 ]?.name ? this.$refs[ this.input_id ]?.files[ 0 ]?.name : '';
          },
        }
      },

      handlers ()
      {
        return {
          uploadFile : ( payload = {} ) => {
            document.querySelector( `#${ this.input_id }` ).value = null;

            this.setters().setUploadStatus();

            document.querySelector( `#${ this.input_id }` ).click();
          },

          uploadPicture : ( payload = {} ) => {
            console.log( 'this.$refs', this.$refs );
            console.log( 'file name', this.$refs[ this.input_id ]?.files[ 0 ]?.name );

            this.selectedFile = new FormData();

            this.selectedFile.append( 'file', this.$refs[ this.input_id ].files[ 0 ] );
            this.selectedFile.append( 'description', 'text' );

            console.log( 'selectedFile' );
            console.log( this.selectedFile );

            this.setters().setUploadStatus();
            this.$emit(
              'photo_selected',

              {
                photo : this.selectedFile,
                photo_name : this.selectedFileName,
              }
            );
          },

          onActionDeleteClick : ( payload = {} ) => {
            this.$emit( 'delete_media', payload );
          },

          onPreviewClick : ( payload = {} ) => {
            console.log( 'onPreviewClick', payload ); // DELETE

            window.open( payload.photo.original_url, '_blank').focus();
          },
        }
      },

      helpers ()
      {
        return {
          hasPhoto : ( payload = {} ) => {
            return Boolean( this.params?.photo );
          },
        }
      },

      init (){},

      bindActions (){},
    },

    mounted ()
    {
      console.log( 'this.params', this.params );
    },

  }

</script>

<style lang="scss" scoped>

.upload-photo-input
{
  /* OBJECTS STYLES START */
    .upload-photo__haupt-titel
    {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 125%;
      color: #263043;
      margin-bottom: 16px;
    }

    .eingabe
    {
      background: #FFFFFF;
      border: 1px solid #E2E4E5;
      box-sizing: border-box;
      border-radius: 4px;
      height: 48px;
      padding: 14px 17px;

      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      align-items: center;

      &.preview-mode
      {
        padding: 10px !important;

        .eingabe__preview
        {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-content: center;
          justify-content: space-between;
          align-items: center;
          width: 100%;

          .preview__photo
          {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-content: center;
            justify-content: flex-start;
            align-items: center;

            .photo__img
            {
              height: 30px;

              .photo__img_item
              {
                width: 30px;
                height: 30px;
                cursor: pointer;
              }
            }

            .photo__name
            {
              .name__title
              {
                font-weight: 600;
                font-size: 16px;
                line-height: 28px;
                color: #263043;
                margin-left: 10px;
              }
            }
          }

          .preview__actions
          {
            .action
            {
              cursor: pointer;
              user-select: none;

              &.delete
              {
                font-weight: normal;
                font-size: 16px;
                line-height: 28px;
                color: #EB4D3D;
              }
            }
          }
        }
      }
    }

    .upload-btn
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      align-items: center;
      justify-content: flex-start;

      .logo
      {
        display: flex;
        align-items: center;
      }

      .btn
      {
        margin-left: 8px;
        cursor: pointer;

        .btn__title
        {
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 28px;
          color: #0082DE;
        }
      }
    }

    .upload-status
    {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 28px;
      color: #263043;
      opacity: 0.5;
      margin-left: 16px;
    }

    .picture-upload
    {
      display : none;
    }
  /* OBJECTS STYLES END */
}

</style>
