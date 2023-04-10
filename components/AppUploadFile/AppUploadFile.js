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
    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
