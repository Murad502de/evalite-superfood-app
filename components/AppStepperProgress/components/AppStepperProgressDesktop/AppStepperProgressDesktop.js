import AppStepperProgressDesktopStep from '../AppStepperProgressDesktopStep';

export default {
  components: {
    AppStepperProgressDesktopStep,
  },

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
    // activeTab() {
    //   return;
    // },
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
    console.debug("components/AppStepperProgress/created"); //DELETE
  },
  mounted() {
    console.debug("components/AppStepperProgress/mounted"); //DELETE
  },
}
