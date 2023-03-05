<template lang="pug">
.rq-table
  .rq-table__header
    .rq-table__actions
      slot(name="actions")

  .rq-table__main
    .rq-table__main-header
      slot(name="header")

    .rq-table__main-body
      slot(name="body")

  slot

  .rq-table__footer
    slot(name="footer")
</template>

<script>
export default {
  components: {},

  props: {},
  data: () => ({}),
  computed: {},

  watch: {},
  methods: {},

  created() { },
  mounted() { },
}
</script>

<style lang="scss">
.rq-table {
  position: relative;
  box-sizing: border-box;
  width: 100%;

  &__actions {
    padding: 0 30px;
    min-height: 44px;
    display: flex;
    align-items: flex-start;
  }

  &__main {
    //display: table;
    width: 100%;

    &-header {
      //display: table-header-group;
    }

    &-body {
      //display: table-row-group;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    padding: 30px 30px 0 30px;
  }
}
</style>
