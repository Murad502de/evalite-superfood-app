import AppUploadFile from '@/components/AppUploadFile/AppUploadFile.vue';
import AppUploadFileCamera from '@/components/AppUploadFileCamera/AppUploadFileCamera.vue';

export default {
  components: {
    AppUploadFile,
    AppUploadFileCamera,
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
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
