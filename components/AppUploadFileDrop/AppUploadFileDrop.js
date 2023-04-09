import DropIconSvg from '@/assets/svg/upload.svg';

export default {
  components: {
    DropIconSvg,
  },

  props: {},
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
      this.drag = true;
    },
    dragLeave() {
      this.drag = false;
    },
    dragOver() {
      this.drag = true;
    },
    drop(e) {
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
