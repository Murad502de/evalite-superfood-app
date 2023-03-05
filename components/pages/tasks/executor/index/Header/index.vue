<template lang="pug">
.page-task-contractor-header
  .page-task-contractor-header__desktop
    .page-task-contractor-header__desktop-title {{ title }}

  .page-task-contractor-header__mobile
    .page-task-contractor-header__mobile-title {{ title }}
</template>

<script>
export default {
  components: {},

  props: {},
  data: () => ({
    title: 'Мои заявки',
  }),
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
.page-task-contractor-header {
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 700;

  &__desktop {
    display: block;

    &-title {
      font-size: 32px;
      line-height: 125%;
      color: #263043;
    }
  }

  &__mobile {
    display: none;
    padding: 16px;
    background: #0082DE;

    &-title {
      font-size: 24px;
      line-height: 30px;
      color: #FFFFFF;
    }
  }

  @media screen and (max-width: 768px) {
    &__desktop {
      display: none;
    }

    &__mobile {
      display: block;
    }
  }
}
</style>
