import AppCard from '@/components/AppCard/AppCard.vue';
import AppSkeleton from '@/components/AppSkeleton/AppSkeleton.vue';

export default {
  components: {
    AppCard,
    AppSkeleton,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: Number | String,
      required: true,
    },
    value: {
      type: Number | String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() { },
  mounted() { },
}
