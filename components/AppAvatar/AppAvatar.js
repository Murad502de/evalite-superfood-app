export default {
  components: {},

  props: {
    url: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: '256',
    },
    error: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      return {
        'app-avatar_error': this.error,
        'app-avatar_disabled': this.disabled,
      };
    },
  },

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    selectFile() {
      if (!this.disabled) {
        this.$refs.input.click();
      }
    },
    selectedFile(e) {
      this.$emit('upload', e.target.files[0]);
      this.inputReset();
    },

    /* HELPERS */
    inputReset() {
      this.$refs.input.value = null;
    },

    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
