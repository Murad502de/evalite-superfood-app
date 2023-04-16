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
    outlined: {
      type: Boolean,
      default: false,
    },
    elevation: {
      type: Number,
      default: 0,
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
    click() {
      this.$emit('click');
    },

    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
