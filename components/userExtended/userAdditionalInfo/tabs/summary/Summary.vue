<template lang="pug">

.summary
  .wrapper
    .work-schedule-wrapper
      WorkSchedule

    .trustworthiness-average_rate-wrapper
      Trustworthiness.item
      AverageRate.item

    .favorite-objects-wrapper
      FavoriteObjects( :user_type="user_type" )

</template>

<script>

  import { CONTRACTOR, EMPLOYEE } from '@/constants/';
  import WorkSchedule             from './WorkSchedule.vue';
  import Trustworthiness          from './Trustworthiness.vue';
  import AverageRate              from './AverageRate.vue';
  import FavoriteObjects          from './FavoriteObjects.vue';

  export default {
    components : {
      WorkSchedule,
      Trustworthiness,
      AverageRate,
      FavoriteObjects,
    },

    data ()
    {
      return {
        user_type : CONTRACTOR,
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
    },
  }

</script>

<style lang="scss" scoped>

.summary
{
  .wrapper
  {
    .work-schedule-wrapper
    {
      margin-bottom : 32px;
    }

    .trustworthiness-average_rate-wrapper
    {
      display         : flex;
      flex-direction  : row;
      flex-wrap       : nowrap;
      align-content   : center;
      justify-content : flex-start;
      width           : 100%;
      margin-bottom   : 40px;

      .item
      {
        width : 50%;

        &:last-child
        {
          margin-left : 24px;
        }
      }
    }

    .favorite-objects-wrapper
    {}
  }
}

</style>
