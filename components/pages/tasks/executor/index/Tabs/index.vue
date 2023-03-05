<template lang="pug">
.page-task-contractor-tabs
  v-tabs(
    :class="['page-task-contractor-tabs__items',]"
    active-class="page-task-contractor-tabs__item_active"
  )
    v-tab.page-task-contractor-tabs__item
      span.page-task-contractor-tabs__item-title Доступно
      span.page-task-contractor-tabs__item-count 10

    v-tab.page-task-contractor-tabs__item
      span.page-task-contractor-tabs__item-title Откликнулся
      span.page-task-contractor-tabs__item-count 26

    v-tab.page-task-contractor-tabs__item
      span.page-task-contractor-tabs__item-title Завершено
      span.page-task-contractor-tabs__item-count 32
</template>

<script>
export default {
  components: {},

  props: {},
  data: () => ({}),
  computed: {},

  watch: {},
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
.page-task-contractor-tabs {
  &__items {
    width: max-content !important;
    flex: unset !important;
  }

  &__item {
    font-family: 'Source Sans Pro';
    font-style: normal;

    &-title {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      text-transform: none !important;
    }

    &-count {
      margin-left: 5px;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;

      &:before {
        content: "("
      }

      &:after {
        content: ")";
      }
    }

    &_active {
      color: #0082DE !important;
    }

    @media screen and (max-width: 768px) {
      &-title {
        font-weight: 700;
        font-size: 14px;
        line-height: 125%;
      }

      &-count {
        background: #7A91A9;
        border-radius: 16px;
        padding: 0px 8px;
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        color: #FFFFFF;

        &:before {
          content: ""
        }

        &:after {
          content: "";
        }
      }

      &_active {
        .page-task-contractor-tabs__item-count {
          background: #0082DE !important;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #D5DEE8;

    .v-tabs-bar {
      border: 0 !important;
    }
  }
}
</style>
