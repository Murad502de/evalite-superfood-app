import AppCard from '@/components/AppCard/AppCard.vue';

export default {
  components: {
    AppCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    edit() {
      this.$emit('edit');
    },
  },
  created() { },
  mounted() { },
};
