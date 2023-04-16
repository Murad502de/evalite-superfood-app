import AppStepperProgressDesktop from './components/AppStepperProgressDesktop';
import AppStepperProgressMobile from './components/AppStepperProgressMobile';

export default {
  components: {
    AppStepperProgressDesktop,
    AppStepperProgressMobile,
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
    activeStepIndex() {
      return this.steps.findIndex(step => step.active);
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
    console.debug("pages/AppStepperProgress/created"); //DELETE
  },
  mounted() {
    console.debug("pages/AppStepperProgress/mounted"); //DELETE
  },
}
