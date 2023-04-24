export default {
  components: {},

  props: {
    url: {
      type: String,
      default: null,
    },
    error: {
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
        'app-avatar_error': this.error
      };
    },
  },

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    selectFile(e) {
      this.$refs.input.click();
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
