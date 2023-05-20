import AppOverlay from '@/components/AppOverlay/AppOverlay.vue';

import AppSkeleton from '@/components/AppSkeleton/AppSkeleton.vue';

export default {
  components: {
    AppOverlay,

    AppSkeleton,
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
