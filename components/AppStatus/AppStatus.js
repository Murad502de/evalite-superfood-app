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

        default:
          return '';
      }
    },
  },
  created() { },
  mounted() { },
}
