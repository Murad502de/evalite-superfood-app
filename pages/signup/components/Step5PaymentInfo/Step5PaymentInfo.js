import TheInstructions from './components/TheInstructions/TheInstructions.vue';
import TheClientForms from './components/TheClientForms/TheClientForms.vue';

export default {
  components: {
    TheInstructions,
    TheClientForms,
  },

  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      theClientFormsProgress: 0,
    };
  },
  computed: {},

  watch: {
    theClientFormsProgress(newVal) {
      this.$emit('update:progress', newVal);
    },
  },
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
