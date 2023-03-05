<template lang="pug">
.rq-breadcrumbs
  .rq-breadcrumbs__item(
    v-for="(breadcrumb, iBreadcrumb) in breadcrumbs",
    :key="iBreadcrumb",
    :class="[{ 'rq-breadcrumbs__item_last': isLast({ index: iBreadcrumb, breadcrumb }) }]",
    @click="onBreadcrumbClicked({ breadcrumb })"
  ) {{ breadcrumb.text }}
</template>

<script>
export default {
  components: {},
  props: {
    breadcrumbs: {
      type: Array,
    },
  },
  computed: {},
  watch: {},
  methods: {
    /* HANDLERS */
    onBreadcrumbClicked(payload = null) {
      //console.debug("onBreadcrumbClicked", payload); // DELETE

      if (!payload) {
        return;
      }

      if (!payload.breadcrumb.last) {
        this.$router.push(payload.breadcrumb.href);
      }
    },

    /* HELPERS */
    isLast(payload = null) {
      //console.debug("isLast", payload); // DELETE
      //console.debug("breadcrumbs", payload, this.breadcrumbs); // DELETE

      if (!payload) {
        return false;
      }

      if (payload.index === this.breadcrumbs.length - 1) {
        payload.breadcrumb.last = true;
      }

      return (
        payload.index === this.breadcrumbs.length - 1 &&
        this.breadcrumbs.length > 1
      );
    },
  },

  data() {
    return {
      path: null,
    };
  },
};
</script>

<style lang="scss">
.rq-breadcrumbs {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;

  &__item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 20px 24px;
    font-family: "Source Sans Pro";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 125%;
    color: #000000;
    cursor: pointer;
    user-select: none;

    &_last {
      background: linear-gradient(0deg, #f1f8ff, #f1f8ff), #e2ecf5;
    }
  }
}
</style>
