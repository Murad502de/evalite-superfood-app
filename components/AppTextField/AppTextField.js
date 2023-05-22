import AppSkeleton from '@/components/AppSkeleton/AppSkeleton.vue';

export default {
  components: {
    AppSkeleton,
  },
  props: {
    outlined: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rules: {
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
    input(e) {
      this.$emit('input', e);
    },
  },
  created() { },
  mounted() { },
}
