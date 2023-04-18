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
  },
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
    /* ACTIONS */
    sendCodeToConfirm() {
      this.$emit('sendCodeToConfirm', this.code);
    },
    sendCodeToEmail() {
      this.$emit('sendCodeToEmail', this.email);
    },
  },

  created() {
    this.$emit('startTimer');
  },
  mounted() { },
}
