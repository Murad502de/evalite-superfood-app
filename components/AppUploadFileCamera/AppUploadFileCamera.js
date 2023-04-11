import AppButton from '@/components/AppButton/AppButton.vue';
import CameraIconSvg from '@/assets/svg/camera.svg';

export default {
  components: {
    AppButton,
    CameraIconSvg,
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'снять фото с камеры',
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
