export default {
  components: {},
  props: {
    status: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    getTitle() {
      switch (this.status) {
        case 'waiting':
          return 'Не выплачено';
        case 'processing':
          return 'В обработке';
        case 'completed':
        case 'closed':
          return 'Выплачено';
        default:
          return '';
      }
    },
  },
  created() { },
  mounted() { },
}
