import { mapActions } from 'vuex';

export default {
  components: {},

  props: {
    email: {
      type: String,
      require: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      code: '',
      codeLength: 4,
    };
  },
  computed: {
    isConfirmCodeActive() {
      return this.code.length === this.codeLength
    },
    computedProgress() {
      let progress = 0;

      if (this.code.length) {
        progress += 10;
      }

      return progress;
    },
  },

  watch: {
    computedProgress(newVal) {
      this.$emit('update:progress', newVal);
    },
    code(newVal) {
      this.setUserSignupData({ user_confirm_code: newVal });
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
    this.$emit('startTimer');
  },
  mounted() { },
}
