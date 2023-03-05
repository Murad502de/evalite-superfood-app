<template lang="pug">

  .averagetime
    .wrapper
      .icon
        v-icon(color="#7A91A9" size="28px") mdi-lightning-bolt-outline
      .header
        h3.title {{ titles.header }}

      .body
        .percent
          .value ≈{{ `${ employee_id.average } мин` }}

        .add-information
          .titel {{ titles.lastMonth }}
          .value +24%


</template>

<script>

import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {

  components: {},

  computed: {
    ...mapGetters('employee_id', ['employee_id',]),
  },

  data() {
    return {
      titles: {
        header: 'Среднее время закрытия заявки',
        lastMonth: 'предыдущий месяц',
      },
    }
  },
}

</script>

<style lang="scss">

@import '../../../../../assets/scss/colors.scss';

/* OBJECTS STYLES START */
.averagetime {
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 30px;
  padding: 27px;
  padding-bottom: 50px;

  .wrapper {

    .icon{
      margin-bottom: 10px;
    }
    .header {
      margin-bottom: 16px;

      .title {
        font-weight: bold;
        font-size: 22px;
        line-height: 125%;
        color: $black;
        min-height: 48px;
      }
    }

    .body {
    }
  }
  .percent {
    margin-bottom: 16px;

    .value {
      font-weight: 600;
      font-size: 50px;
      line-height: 125%;
      color: $green;
    }
  }
}



.add-information {
  display: flex;
  justify-content: space-between;
  line-height: 1.25;
  margin-bottom: 4px;

  .value {
    font-weight: 600;
  }
}

/* OBJECTS STYLES END */

</style>
