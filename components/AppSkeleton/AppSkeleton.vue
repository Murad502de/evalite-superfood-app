<template lang="pug">
.app-skeleton(:style="{ height: `${height}px` }")
</template>

<script>
export default {
  components: {},

  props: {
    height: {
      type: [String, Number],
      default: 48,
    },
  },
  data: () => ({}),
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style lang="scss">
.app-skeleton {
  width: 100%;
  background: rgba(0, 0, 0, 0.05);
  opacity: 1;
  display: inline-block;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  border: 1px solid #E2E4E5;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.5) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 2s infinite;
    content: "";
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
