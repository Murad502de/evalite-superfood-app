<template lang="pug">
v-app.ruqi-layout-default
  .ruqi-layout-default__container
    TheSideBarLeft.ruqi-layout-default__sidebar
    Nuxt.ruqi-layout-default__main
</template>

<script>
import TheSideBarLeft from "@/components/TheSideBarLeft/TheSideBarLeft.vue";

export default {
  name: "default",
  components: {
    TheSideBarLeft,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeUnmount() {},
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";

.ruqi-layout-default {
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
  }
}
</style>
