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
  },
  data() {
    return {
      mediaNameDefault: 'Образец',
    };
  },
  computed: {
    disabled() {
      return !!this.mediaUrl;
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
