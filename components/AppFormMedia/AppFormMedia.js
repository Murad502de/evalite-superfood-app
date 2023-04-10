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
  },
  data() {
    return {
      media: null,
    };
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
