import AppOverlay from '@/components/AppOverlay/AppOverlay.vue';

export default {
  components: {
    AppOverlay,
  },
  props: {
    dialog: {
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
    close() {
      this.$emit('close');
    },
    save() {
      this.$emit('save');
    },
  },
  created() { },
  mounted() { },
}
