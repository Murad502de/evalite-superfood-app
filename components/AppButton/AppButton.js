export default {
  components: {},

  props: {
    color: {
      type: String,
      default: '#0082DE',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      defaultStyle: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: '14px',
        lineHeight: '125%',
        letterSpacing: 'unset',
        borderRadius: '8px',
      },
    }
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
