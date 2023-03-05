<template lang="pug">

.attachment
  .wrapper
    .attachmenti-picture
      img.preview(
        :src="picture.preview_url"
        @click="handlers().onPreviewClick( { photo : picture.original_url } )"
      )
    .attachment-info
      .pic-titel {{ picture.name }}
      .pic-description
        .pic-created.desc-item
          .titel Загружен
          .value {{ helpers().parseDate( { date : picture.created_at } ) }}
        .pic-updated.desc-item
          .titel Изменен
          .value {{ helpers().parseDate( { date : picture.updated_at } ) }}
        .pic-confirmed.desc-item
          .titel Утвержден
          .value {{ helpers().parseDate( { date : picture.confirmed_at } ) }}
      .actions
        .titel действия

</template>

<script>

  export default {

    computed : {},

    props : {
      picture : {
        type : Object,
        required : true,
      },
    },

    data ()
    {
      return {}
    },

    methods : {
      getters ()
      {
        return {}
      },

      setters ()
      {
        return {}
      },

      handlers ()
      {
        return {
          onPreviewClick : ( payload = {} ) => {
            console.log( 'onPreviewClick', payload ); // DELETE

            window.open( payload.photo, '_blank').focus();
          },
        }
      },

      helpers ()
      {
        return {

          /**
           *
           * @param { object } params
           * {
           *    date : "2021-12-15T11:39:40.000000Z",
           * }
           */
          parseDate : ( params = {} ) => {
            console.debug( 'getRegDate' );

            if ( !params.date )
            {
              return '';
            }

            console.debug( params.date.split( 'T' )[ 0 ].split( '-' ) );

            let splitedCreat_at = params.date.split( 'T' )[ 0 ].split( '-' );

            return `${ splitedCreat_at[ 2 ] }.${ splitedCreat_at[ 1 ] }.${ splitedCreat_at[ 0 ][ 2 ] }${ splitedCreat_at[ 0 ][ 3 ] }`;
          },

          /**
           *
           * @param { object } params
           * {
           *    month : "12" || "01" || "09",
           * }
           */
          parseMonth : ( params = {} ) => {
            switch ( params.month )
            {
              case '01' :
              return 'января';

              case '02' :
              return 'февраля';

              case '03' :
              return 'марта';

              case '04' :
              return 'апреля';

              case '05' :
              return 'мая';

              case '06' :
              return 'июня';

              case '07' :
              return 'июля';

              case '08' :
              return 'августа';

              case '09' :
              return 'сентября';

              case '10' :
              return 'октября';

              case '11' :
              return 'ноября';

              case '12' :
              return 'декабря';

              default :
              return '';
            }
          },

          isContractor : ( params = {} ) => {
            console.debug( 'helpers : isContractor', params, CONTRACTOR );

            switch ( params.user )
            {
              case CONTRACTOR :
                console.debug( 'CONTRACTOR' );
              return true;

              default :
                console.debug( 'DEFAULT' );
              return false;
            }
          },
        }
      },

      init (){},

      bindActions (){},
    },

    mounted ()
    {
      console.log( 'attachment mounted', this.picture );
    },

  }

</script>

<style lang="scss" scoped>

.attachment
{
  width         : 210px;
  min-height        : 445px;
  //background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  //box-shadow: 0px 6px 73px rgba(0, 0, 0, 0.07);
  border-radius: 10px;

  .wrapper
  {
    width           : 100%;
    height          : 100%;
  }
}

.attachmenti-picture
{
  width: 208px;
  min-height: 270px;
  background: #F6FBFF;
  //border: 1px solid #E0E0E0;
  box-sizing: border-box;
  //box-shadow: 0px 6px 73px rgba(0, 0, 0, 0.07);
  border-radius: 10px 10px 0px 0px;
  padding: 24px 24px 19px 24px;

  .preview
  {
    cursor: pointer;
  }
}

.attachment-info
{
  width: 208px;
  min-height: 173px;
  background: #FFFFFF;
  border-top: 1px solid #E0E0E0;
  box-sizing: border-box;
  //box-shadow: 0px 6px 73px rgba(0, 0, 0, 0.07);
  border-radius: 0px 0px 10px 10px;
  padding: 16px;

  .pic-titel
  {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    color: #333333;
    margin-bottom: 8px;
  }

  .pic-description
  {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #7A91A9;

    margin-bottom: 16px;

    .desc-item
    {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: space-between;
      align-items: center;
    }
  }
}

.actions
{
  display: flex;
  flex-direction: row;
  padding: 12px 16px;
  width: 180px;
  height: 29px;
  background: #0082DE;
  border-radius: 4px;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;

  .titel
  {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 125%;
    text-transform: uppercase;
    color: #FFFFFF;
  }
}

</style>
