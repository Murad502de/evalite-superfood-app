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
          return 'Ожидает';

        case 'processing':
          return 'В обработке';

        case 'completed':
          return 'Выполнен';

        default:
          return '';
      }
    },
  },
  created() { },
  mounted() { },
}
