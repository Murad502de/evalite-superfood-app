import AppStepperProgressStep from './components/AppStepperProgressStep';

export default {
  components: {
    AppStepperProgressStep,
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
    console.debug("pages/AppStepperProgress/created"); //DELETE
  },
  mounted() {
    console.debug("pages/AppStepperProgress/mounted"); //DELETE
  },
}
