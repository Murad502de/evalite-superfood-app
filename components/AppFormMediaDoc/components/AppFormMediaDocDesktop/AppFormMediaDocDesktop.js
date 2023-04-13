import AppUploadFileDrop from '@/components/AppUploadFileDrop/AppUploadFileDrop.vue';
import AppUploadFile from '@/components/AppUploadFile/AppUploadFile.vue';

export default {
  components: {
    AppUploadFileDrop,
    AppUploadFile,
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      title: 'или загрузите',
      media: null,
      file: null,
    };
  },
  computed: {},

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    upload(file = null) {
      this.$emit('upload', file);
    },

    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
