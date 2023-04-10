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
    disabled: {
      type: Boolean,
      default: false,
    },
    mediaUrl: {
      type: String,
      default: null,
    },
    mediaName: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      uploadedFileUrl: null,
    };
  },
  computed: {},

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

    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
