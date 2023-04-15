import AppBarEmpty from '@/components/AppBarEmpty';
import Steps from './components/Steps/Steps.vue';

export default {
  layout: "empty",
  components: {
    AppBarEmpty,
    Steps,
  },

  props: {},
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

  created() {
    console.debug("pages/signup/created"); //DELETE
  },
  mounted() {
    console.debug("pages/signup/mounted"); //DELETE
  },
}
