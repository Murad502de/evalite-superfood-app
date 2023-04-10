import DropIconSvg from '@/assets/svg/upload.svg';

export default {
  components: {
    DropIconSvg,
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      drag: false,
    };
  },
  computed: {},

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    dragStart() {
      if (this.disabled) return;

      this.drag = true;
    },
    dragLeave() {
      if (this.disabled) return;

      this.drag = false;
    },
    dragOver() {
      if (this.disabled) return;

      this.drag = true;
    },
    drop(e) {
      if (this.disabled) return;

      console.debug('AppUploadFileDrop/handlers/drop/e', e); //DELETE
      console.debug('AppUploadFileDrop/handlers/drop/files', [...e.dataTransfer.files]); //DELETE

      this.drag = false;
    },

    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
