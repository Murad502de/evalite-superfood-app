import AppCard from '@/components/AppCard/AppCard.vue';

export default {
  components: {
    AppCard,
  },
  props: {
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
