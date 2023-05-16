<template lang="pug">
v-app.ruqi-layout-default
  .ruqi-layout-default__container
    TheSideBarLeft.ruqi-layout-default__sidebar
    .ruqi-layout-default__main
      TheSideBarTop.ruqi-layout-default__topbar(
        :section="getPageNameByRouteName(activePage)"
      )
      Nuxt.ruqi-layout-default__main-page
</template>

<script>
import TheSideBarLeft from "@/components/TheSideBarLeft/TheSideBarLeft.vue";
import TheSideBarTop from "@/components/TheSideBarTop/TheSideBarTop.vue";
import * as routeNames from "@/shared/routeNames";

export default {
  name: "default",
  components: {
    TheSideBarLeft,
    TheSideBarTop,
  },
  data() {
    return {};
  },
  computed: {
    activePage() {
      return this.$route.name;
    },
  },
  watch: {},
  methods: {
    getPageNameByRouteName(name) {
      switch (name) {
        case routeNames.applications:
          return "Заявки";
        case routeNames.settings:
          return "Настройки";
        case routeNames.profile:
          return "Профиль";
        default:
          return "";
      }
    },
  },
  created() {},
  mounted() {},
  beforeUnmount() {},
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";

.ruqi-layout-default {
  overflow: hidden;

  &__container {
    box-sizing: border-box;
    height: 100vh;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  &__sidebar {
  }
  &__main {
    box-sizing: border-box;
    background: $backdrop-gray;
    flex: 1;
    overflow-y: scroll;

    &-page {
    }
  }
}
</style>
