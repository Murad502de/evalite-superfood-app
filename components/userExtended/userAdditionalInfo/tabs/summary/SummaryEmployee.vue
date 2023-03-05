<template lang="pug">

  .summary
    .wrapper
      .trustworthiness-average_rate-wrapper
        AverageTime.item
        Efficiency.item
        Support.item

      .favorite-objects-wrapper
        FavoriteObjects( :user_type="user_type" )

</template>

<script>

import { CONTRACTOR, EMPLOYEE } from '@/constants/';
import AverageTime              from './AverageTime.vue';
import Efficiency               from './Efficiency.vue';
import Support                  from './Support.vue';
import FavoriteObjects          from './FavoriteObjects.vue';

export default {
  components : {
    AverageTime,
    Efficiency,
    Support,
    FavoriteObjects,
  },

  data ()
  {
    return {
      user_type : EMPLOYEE,
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
      justify-content : space-between;
      width           : 100%;
      margin-bottom   : 40px;

      .item
      {
        width : calc(33.33% - 40px);
      }
    }

    .favorite-objects-wrapper
    {}
  }
}

</style>
