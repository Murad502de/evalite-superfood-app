import Time from '@/assets/svg/time.svg';
import Docs from '@/assets/svg/docs.svg';
import Hand from '@/assets/svg/hand.svg';

export default {
  components: {
    Time,
    Docs,
    Hand,
  },

  props: {
    icon: {
      type: String,
      // required: true,
    },
    title: {
      type: String,
      // required: true,
    },
    text: {
      type: String,
      // required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},

  watch: {},
  methods: {
    /* GETTERS */
    getIconCmpName({ name, }) {
      if (!name) return null;

      switch (name.toLowerCase()) {
        case 'time':
          return 'Time';

        case 'docs':
          return 'Docs';

        case 'hand':
          return 'Hand';

        default:
          return null;
      }
    },

    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
    /* ACTIONS */
  },

  created() {
    console.debug('QWERTYUIO test'); //DELETE
  },
  mounted() { },
};
