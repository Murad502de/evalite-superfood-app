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
  computed: {},
  watch: {},
  methods: {
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
  },
  created() { },
  mounted() { },
};
