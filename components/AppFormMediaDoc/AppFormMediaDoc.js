import AppFormMediaDocDesktop from './components/AppFormMediaDocDesktop/AppFormMediaDocDesktop.vue';
import AppFormMediaDocMobile from './components/AppFormMediaDocMobile/AppFormMediaDocMobile.vue';
import DocLogoSvg from '@/assets/svg/doc_logo.svg';
import PdfLogoSvg from '@/assets/svg/pdf_logo.svg';
import TrashIconSvg from '@/assets/svg/trash.svg';

export default {
  components: {
    AppFormMediaDocDesktop,
    AppFormMediaDocMobile,
    DocLogoSvg,
    PdfLogoSvg,
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
    type: {
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
    getDocType() {
      switch (this.type) {
        case 'pdf':
          return 'pdf';

        default:
          return 'default';
      }
    },

    /* SETTERS */
    /* HANDLERS */
    upload(file) {
      this.$emit('upload', file);
    },
    deleteFile() {
      this.$emit('delete');
    },
    openFile() {
      window.open(this.mediaUrl, '_blank').focus();
    },

    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
