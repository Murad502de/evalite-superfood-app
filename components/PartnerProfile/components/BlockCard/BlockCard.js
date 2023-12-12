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
    disabled: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    edit() {
      if (this.disabled) return;
      this.$emit('edit');
    },
  },
  created() { },
  mounted() { },
};
