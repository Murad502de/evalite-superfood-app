import AppFormMediaDesktop from './components/AppFormMediaDesktop/AppFormMediaDesktop.vue';
import AppFormMediaMobile from './components/AppFormMediaMobile/AppFormMediaMobile.vue';
import TrashIconSvg from '@/assets/svg/trash.svg';

export default {
  components: {
    AppFormMediaDesktop,
    AppFormMediaMobile,
    TrashIconSvg,
  },

  props: {
    mediaName: {
      type: String,
      default: null,
    },
    mediaUrl: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mediaNameDefault: 'Образец',
    };
  },
  computed: {
    isDisabled() {
      return !!this.mediaUrl || this.disabled;
    },
  },

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    upload(file) {
      this.$emit('upload', file);
    },
    deleteFile() {
      this.$emit('delete');
    },
    open() {
      window.open(this.mediaUrl, '_blank').focus();
    },

    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
