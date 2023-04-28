<template lang="pug">
.rq-home Home Page
  //- component(:is="getComponent(user.type)")
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "default",
  components: {
    // superManager,
    // manager,
    // dispatcher,
    // executor,
  },

  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["user"]),
  },

  watch: {},
  methods: {
    /* GETTERS */
    getComponent(name) {
      switch (name) {
        case "superManager":
          return "superManager";

        case "manager":
          return "manager";

        case "dispatcher":
          return "dispatcher";

        case "contractor":
          return "executor";

        default:
          return "";
      }
    },

    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
  },

  created() {},
  mounted() {},
};
</script>

<style lang="scss">
</style>
