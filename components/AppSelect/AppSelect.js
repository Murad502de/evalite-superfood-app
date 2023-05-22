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
    rules: {
      type: Array,
      default: () => ([]),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => ([]),
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    input(e) {
      console.debug(e); //DELETE
      this.$emit('input', e);
    },
  },
  created() { },
  mounted() { },
}
