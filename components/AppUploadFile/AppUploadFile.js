import AppButton from '@/components/AppButton/AppButton.vue';
import FileIconSvg from '@/assets/svg/file.svg';

export default {
  components: {
    AppButton,
    FileIconSvg,
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
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
      console.debug('selectFile'); //DELETE

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
