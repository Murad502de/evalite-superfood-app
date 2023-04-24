export default {
  components: {},

  props: {
    url: {
      type: String,
      default: null,
    },
  },
  data() {
    return {};
  },
  computed: {},

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
