import * as textContent from './shared/textContent';
import PartnerProfile from '@/components/PartnerProfile/PartnerProfile.vue';

export default {
  components: {
    PartnerProfile,
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
