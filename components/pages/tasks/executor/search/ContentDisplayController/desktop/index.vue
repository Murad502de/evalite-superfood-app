<template lang="pug">
.rq-tcdc
  .rq-tcdc__row
    .rq-tcdc__title Найдено 32 заявки
    v-tabs.rq-tcdc__tabs(
      hide-slider
      active-class="rq-tcdc__tabs-item_active"
      height="43px"
      v-model="tab"
    )
      v-tab.rq-tcdc__tabs-item(style="padding: 0 !important;")
        svg.rq-tcdc__tabs-item-icon(
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        )
          path.rq-tcdc__tabs-item-icon--list(
            d="M0 0.993C0.00183004 0.730378 0.1069 0.479017 0.292513 0.293218C0.478126 0.107418 0.72938 0.00209465 0.992 0H19.008C19.556 0 20 0.445 20 0.993V17.007C19.9982 17.2696 19.8931 17.521 19.7075 17.7068C19.5219 17.8926 19.2706 17.9979 19.008 18H0.992C0.728813 17.9997 0.476497 17.895 0.290489 17.7088C0.104482 17.5226 -1.33455e-07 17.2702 0 17.007V0.993ZM9 2H2V16H9V2ZM11 2V16H18V2H11ZM12 4H17V6H12V4ZM12 7H17V9H12V7Z"
            fill="#263043"
          )

        span.rq-tcdc__tabs-item-title Списком

      v-tab.rq-tcdc__tabs-item(style="padding: 0 !important;")
        svg.rq-tcdc__tabs-item-icon(
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        )
          path.rq-tcdc__tabs-item-icon--map(
            d="M13 3L7 1M7 17L1.79 18.737C1.69973 18.7671 1.60358 18.7754 1.5095 18.761C1.41542 18.7467 1.32611 18.7101 1.24893 18.6544C1.17175 18.5988 1.10893 18.5255 1.06565 18.4408C1.02236 18.356 0.999861 18.2622 1 18.167V3.433C1.00003 3.30714 1.03963 3.18447 1.11321 3.08236C1.18679 2.98025 1.29062 2.90386 1.41 2.864L7 1V17ZM7 17L13 19L7 17ZM7 17V1V17ZM13 19L18.59 17.137C18.7095 17.0971 18.8135 17.0205 18.8871 16.9182C18.9607 16.8159 19.0002 16.693 19 16.567V1.832C19 1.73692 18.9774 1.6432 18.934 1.55857C18.8907 1.47394 18.8278 1.40083 18.7507 1.34526C18.6735 1.28969 18.5843 1.25325 18.4902 1.23895C18.3962 1.22465 18.3002 1.23289 18.21 1.263L13 3V19ZM13 19V3V19Z"
            stroke="#263043"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          )

        span.rq-tcdc__tabs-item-title На карте

  .rq-tcdc__row
    .rq-tcdc__sort
      v-select.rq-tcdc__sort-select(
        :items="sortActive"
        v-model="active"
        prefix="Порядок:"
        outlined
        hide-details="true"
        item-text="name"
        item-value="id"
      )
</template>

<script>
export default {
  components: {},

  props: {},

  data() {
    return {
      active: '',
      tab: 0,
      sortActive: [
        {
          id: 0,
          name: 'Сначала ближайшие (по локации)',
        },
        {
          id: 1,
          name: 'Сначала дорогие (по стоимости ставки)',
        },
        {
          id: 2,
          name: 'Сначала ближайший старт работ (по дате старта)',
        },
      ],
    }
  },

  computed: {},

  watch: {
    tab(newTab) {
      this.$emit('clickOnTab', newTab);
    },
  },

  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
  },

  created() { },

  mounted() { },
}
</script>

<style lang="scss">
.rq-tcdc {
  &__row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 125%;
    color: #263043;
  }

  &__tabs {
    width: max-content;
    background: #F2F5F8;
    border: 1px solid #D5DEE8;
    border-radius: 40px;
    flex: none !important;

    &-item {
      width: 156px;
      color: #FFFFFF !important;

      &-icon {
        color: #FFFFFF !important;
        background: transparent !important;
      }

      &-title {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 125%;
        white-space: nowrap;
        color: #263043;
        margin-left: 10px;
      }

      &_active {
        background: #FFFFFF;
        border: 1px solid #D5DEE8;
        border-radius: 40px;
        color: #0082DE !important;

        .rq-tcdc__tabs-item-icon {
          &--list {
            fill: #0082DE !important;
          }

          &--map {
            stroke: #0082DE !important;
          }
        }

        .rq-tcdc__tabs-item-title {
          color: #0082DE !important;
        }
      }
    }

    .v-tabs-bar {
      border: 0 !important;
    }

    .v-tab {
      padding: 12px 50px !important;
      text-transform: none !important;
    }
  }

  // &__tabs {
  //   box-sizing: border-box;
  //   background: #F5F7F9;
  //   border: 1px solid #D5DEE8;
  //   border-radius: 30px;
  //   display: flex;
  //   flex-direction: row;
  //   flex-wrap: nowrap;
  //   align-content: center;
  //   justify-content: flex-start;
  //   align-items: center;
  //   width: max-content;

  //   &-item {
  //     font-family: 'Source Sans Pro';
  //     font-style: normal;
  //     font-weight: 600;
  //     font-size: 16px;
  //     line-height: 125%;
  //     display: flex;
  //     align-items: center;
  //     text-align: center;
  //     color: #263043;
  //     width: 156px;
  //     height: 48px;
  //     flex-direction: row;
  //     justify-content: center;
  //     flex-wrap: nowrap;
  //     align-content: center;
  //     cursor: pointer;

  //     &_active {
  //       color: #0082DE;
  //       background: #FFFFFF;
  //       border: 1px solid #D5DEE8;
  //       border-radius: 30px;
  //     }
  //   }
  // }

  &__sort {
    width: 259px;

    &-select {
      .item {
        width: 245px;
        height: 44px;

        .v-input__slot {
          margin: 0 !important;
          background: #FFFFFF;
          border: 1px solid #D5DEE8 !important;
          box-sizing: border-box;
          border-radius: 10px;
          box-shadow: unset !important;
        }
      }
    }
  }
}
</style>
