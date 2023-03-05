<template lang="pug">

.work-schedule
  .wrapper
    .content
      .info-part
        .logo
          img.ready-for-work( src="@/assets/img/ready-for-work.svg" )

        .titles
          .haupttitel {{ haupttitel }}
          .untertitel {{ untertitelTeil }}

      .setting-areas
        .setting-area( class="desired-schedule" )
          .area-title {{ desiredSchedule }}
          .area-description
            .graph( v-if="contractor.ready_work && contractor.ready_work.graph.length" )
              span.day( v-for="( day, index ) in contractor.ready_work.graph" :key="index" ) {{ day }}

            .graph.empty( v-else ) {{ graphEmpty }}


        .setting-area( class="night-shifts" )
          .area-title {{ nightShifts }}
          .area-description
            .graph( v-if="contractor.ready_work && contractor.ready_work.night.length" )
              span.day( v-for="( day, index ) in contractor.ready_work.night" :key="index" ) {{ day }}

            .graph.empty( v-else ) {{ graphEmpty }}

    .actions
      .change-status-btn
        .btn-title {{ changeStatusBtn }}

</template>

<script>

  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

  export default {

    components : {},

    computed : {
      ...mapGetters( 'contractors', [ 'contractor', ] ),
    },

    data ()
    {
      return {
        changeStatusBtn : 'изменить статус',
        haupttitel      : 'Готов к работе',
        untertitelTeil  : 'установлено',
        desiredSchedule : 'Желаемый график:',
        nightShifts     : 'Ночные смены:',
        graphEmpty      : 'нет',
      }
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
        return {}
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

<style lang="scss" scoped>

  /* OBJECTS STYLES START */
    .work-schedule
    {
      background    : #FFFFFF;
      border        : 1px solid #E0E0E0;
      box-sizing    : border-box;
      border-radius : 15px;

      .wrapper{
        display         : flex;
        flex-direction  : row;
        flex-wrap       : nowrap;
        align-content   : center;
        justify-content : space-between;
        align-items     : center;
        padding         : 30px 24px;

        .content
        {
          display         : flex;
          flex-direction  : row;
          flex-wrap       : nowrap;
          align-content   : center;
          justify-content : flex-start;
          align-items     : center;

          .info-part
          {
            display         : flex;
            flex-direction  : row;
            flex-wrap       : nowrap;
            align-content   : center;
            justify-content : flex-start;
            align-items     : center;

            .titles
            {
              margin-left : 17px;
            }
          }

          .setting-areas
          {
            display         : flex;
            flex-direction  : row;
            flex-wrap       : nowrap;
            align-content   : center;
            justify-content : flex-start;
            align-items     : center;
          }
        }
      }
    }

    .change-status-btn
    {
      display         : flex;
      flex-direction  : column;
      align-items     : center;
      padding         : 12px 16px;
      background      : #0082DE;
      border-radius   : 8px;
      cursor          : pointer;

      .btn-title
      {
        font-weight     : bold;
        font-size       : 14px;
        line-height     : 125%;
        display         : flex;
        align-items     : center;
        text-align      : center;
        text-transform  : uppercase;
        color           : #FFFFFF;
      }
    }

    .haupttitel
    {
      font-weight   : bold;
      font-size     : 22px;
      line-height   : 125%;
      display       : flex;
      align-items   : center;
      color         : #19A74A;
    }

    .untertitel
    {
      font-weight : normal;
      font-size   : 14px;
      line-height : 125%;
      display     : flex;
      align-items : center;
      color       : #7A91A9;
    }

    .setting-area
    {
      background    : #FFFFFF;
      border        : 1px solid #E0E0E0;
      box-sizing    : border-box;
      border-radius : 5px;
      padding       : 8px 16px;

      &:first-child
      {
        margin-left : 24px;
      }

      &:last-child
      {
        margin-left : 16px;
      }

      .area-title
      {
        font-weight : normal;
        font-size   : 14px;
        line-height : 125%;
        color       : #7A91A9;
      }

      .area-description
      {
        font-weight : 600;
        font-size   : 16px;
        line-height : 125%;
        color       : #263043;

        .graph
        {
          .day
          {
            &::after
            {
              content : ", ",
            }

            &:last-child::after
            {
              content : "",
            }
          }
        }
      }
    }
  /* OBJECTS STYLES END */

</style>
