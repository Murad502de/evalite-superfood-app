import AppCard from '@/components/AppCard/AppCard.vue';

export default {
  components: {
    AppCard,
  },
  props: {},
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
