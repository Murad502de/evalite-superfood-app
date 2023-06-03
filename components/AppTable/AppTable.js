export default {
  components: {},

  props: {
    headers: {
      type: Array,
      default: () => ([]),
    },
    items: {
      type: Array,
      default: () => ([]),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingText: {
      type: String,
      default: 'Загрузка...',
    },
    page: {
      type: Number,
      required: true,
    },
    lastPage: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    itemsLength: {
      type: Number,
      required: true,
    },
  },
  data: () => ({}),
  computed: {},

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    onRowClick(e) {
      this.$emit('click:row', e);
    },
    updateOptions(e) {
      if (e.itemsPerPage !== this.itemsPerPage) {
        this.$emit('update:itemsPerPage', e);
        return;
      }

      if (e.page !== this.page) {
        this.$emit('update:page', e);
        return;
      }
    },
    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
