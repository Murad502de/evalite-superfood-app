import { mapActions, mapGetters, } from 'vuex';
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
  computed: {
    ...mapGetters('userSignupStore', ['userSignupData']), //DELETE
  },

  watch: {
    tab(newVal) {
      if (newVal == 0) {
        this.setUserSignupData({ user_employment_type: 'individual_entrepreneur' });
        this.$emit('update:progress', this.entrepreneurFormProgress);
      } else {
        this.setUserSignupData({ user_employment_type: 'self_employed' });
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
    ...mapActions('userSignupStore', ['setUserSignupData']),
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
    /* ACTIONS */
  },

  created() {
    this.setUserSignupData({ user_employment_type: this.tab ? 'self_employed' : 'individual_entrepreneur' });
  },
  mounted() { },
}
