<template lang="pug">

  .support
    .wrapper
      .icon
        v-icon(color="#7A91A9" size="28px") mdi-face-agent
      .header
        h3.title {{ titles.header }}

      .body

        .wrapper-likes(v-if="employee_id.support" )
          .likes.item
            v-icon(color="#19A74A" size="28px") mdi-thumb-up-outline
            .value {{ `${ employee_id.support.like }` }}

          .dislikes.item
            v-icon(color="#7A91A9" size="28px") mdi-thumb-down-outline
            .value {{ `${ employee_id.support.dislike }` }}

        .add-information
          .titel {{ titles.totalHits }}
          .value 50

        .add-information
          .titel {{ titles.decidedHits }}
          .value 2

        .add-information
          .titel {{ titles.overdueHits }}
          .value 1


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
        header: 'Поддержка',
        totalHits: 'всего обращений',
        decidedHits: 'решено обращений',
        overdueHits: 'просрочено обращений',
      },
    }
  },
}

</script>

<style lang="scss">

@import '../../../../../assets/scss/colors.scss';

/* OBJECTS STYLES START */
.support {
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 30px;
  padding: 27px;
  padding-bottom: 50px;

  .wrapper {

    .wrapper-likes {
      display: flex;
      font-size: 50px;
      font-weight: 600;
      line-height: 1.25;
      margin-bottom: 16px;

      .item{
        display: flex;

        .v-icon {
          margin-right: 7px;
        }

        .value{
          line-height: 1;
        }
      }

      .likes {
        color: $green;
        margin-right: 32px;
      }

      .dislikes {
        color: $grey;
      }

    }

    .icon {
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
