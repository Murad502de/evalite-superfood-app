<template lang="pug">
.ruqi-applications
  v-tabs(v-model="tab")
    v-tab Верификации
    v-tab Выплаты

  v-window(v-model="tab")
    v-window-item QWERTY 1
    v-window-item QWERTY 2
</template>

<script>
export default {
  layout: "default",
  components: {},
  props: {},
  data() {
    return {
      tab: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style lang="scss">
.ruqi-applications {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  margin: 24px;
}
</style>
