export default {
  components: {},

  props: {
    /*
      example: [{
        title: <string>,
        name: <string>,
        progress: <number>,
      }]
     */
    steps: {
      type: Array,
      default: () => ([]),
    },
    activeStepIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  computed: {
    activeStep() {
      return this.steps[this.activeStepIndex];
    },
  },

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
    /* ACTIONS */
  },

  created() {
    console.debug("components/AppStepperProgressMobile/created"); //DELETE
  },
  mounted() {
    console.debug("components/AppStepperProgressMobile/mounted"); //DELETE
  },
}
