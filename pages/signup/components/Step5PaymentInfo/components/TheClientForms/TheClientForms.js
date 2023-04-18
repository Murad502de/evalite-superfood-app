import TheIndividualEntrepreneurForm from './components/TheIndividualEntrepreneurForm/TheIndividualEntrepreneurForm.vue';
import TheSelfEmployedForm from './components/TheSelfEmployedForm/TheSelfEmployedForm.vue';

export default {
  components: {
    TheIndividualEntrepreneurForm,
    TheSelfEmployedForm,
  },

  props: {},
  data() {
    return {
      tab: 0,
      entrepreneurFormProgress: 0,
      selfEmployedFormProgress: 0,
    };
  },
  computed: {},

  watch: {
    tab(newVal) {
      if (newVal == 0) {
        this.$emit('update:progress', this.entrepreneurFormProgress);
      } else {
        this.$emit('update:progress', this.selfEmployedFormProgress);
      }
    },
    entrepreneurFormProgress(newVal) {
      if (this.tab == 0) {
        this.$emit('update:progress', newVal);
      }
    },
    selfEmployedFormProgress(newVal) {
      if (this.tab == 1) {
        this.$emit('update:progress', newVal);
      }
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
