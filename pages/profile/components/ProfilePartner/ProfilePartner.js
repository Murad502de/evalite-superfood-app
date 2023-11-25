import * as textContent from './shared/textContent';
import PartnerProfileInfoCard from '@/components/PartnerProfileInfoCard/PartnerProfileInfoCard.vue';

export default {
  components: {
    PartnerProfileInfoCard,
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    title() {
      return textContent.title;
    },
  },
  watch: {},
  methods: {},
  created() { },
  mounted() { },
};
