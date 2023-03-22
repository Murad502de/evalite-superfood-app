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
  },

  watch: {},
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
