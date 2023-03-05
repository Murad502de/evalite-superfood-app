
<template lang="pug">
.rq-ctwsr
  .rq-ctwsr__desktop
    slot(name="desktop")

  .rq-ctwsr__mobile
    slot(name="mobile")
</template>

<script>
export default {
  components: {},
  props: {},
  computed: {},
  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
  },

  data() {
    return {}
  },
  created() { },
  mounted() { },
}
</script>

<style lang="scss">
.rq-ctwsr {
  &__desktop {
    display: block;
    max-width: 1272px;
  }

  &__mobile {
    display: none;

    &-card {
      box-sizing: border-box;
      border: 1px solid #E0E0E0;
      border-radius: 14px;
      background: #FFFFFF;
      width: max-content;
      padding: 16px;
      margin-top: 16px;

      &:first-child {
        margin-top: 0;
      }

      @media screen and (max-width: 370px) {
        width: 315px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    &__desktop {
      display: none;
    }

    &__mobile {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
