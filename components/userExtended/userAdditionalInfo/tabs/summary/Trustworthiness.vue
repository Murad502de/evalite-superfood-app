<template lang="pug">

.trustworthiness
  .wrapper
    .header
      h3.titel {{ titles.header }}

    .body
      .percent
        .value( v-if="!!contractor.reliability" ) {{ `${ contractor.reliability }%` }}
        v-skeleton-loader(
          v-else
          width="200"
          height="30px"
          type="text"
        )

      .app-invitations( class="statistics-parameter" )
        .titel {{ titles.appInvitations }}
        .value( v-if="!!contractor.invite_task" ) {{ contractor.invite_task }}
        v-skeleton-loader(
          v-else
          width="200"
          height="30px"
          type="text"
        )

      .absenteeism( class="statistics-parameter" )
        .titel {{ titles.absenteeism }}
        .value( v-if="!!contractor.skip" ) {{ contractor.skip }}
        v-skeleton-loader(
          v-else
          width="200"
          height="30px"
          type="text"
        )

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
        titles : {
          header          : 'Благонадежность',
          appInvitations  : 'Приглашений на заявку',
          absenteeism     : 'Невыходы',
        },
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
  .trustworthiness
  {
    background      : #FFFFFF;
    border          : 1px solid #E0E0E0;
    box-sizing      : border-box;
    border-radius   : 30px;
    padding         : 24px;
    padding-bottom  : 50px;

    .wrapper
    {
      .header
      {
        margin-bottom : 11px;

        .titel
        {
          font-weight : bold;
          font-size   : 22px;
          line-height : 125%;
          color       : #263043;
        }
      }

      .body {}
    }
  }

  .percent
  {
    margin-bottom : 15px;

    .value
    {
      font-weight : 600;
      font-size   : 40px;
      line-height : 125%;
      color       : #FFCB45;
    }
  }

  .app-invitations
  {
    margin-bottom : 16px;
  }

  .statistics-parameter
  {
    font-style  : normal;
    font-size   : 16px;
    line-height : 125%;

    .titel
    {
      font-weight   : normal;
      margin-bottom : 3px;
    }

    .value
    {
      font-weight : bold;
    }
  }
/* OBJECTS STYLES END */

</style>
