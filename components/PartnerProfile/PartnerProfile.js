import AppCard from '@/components/AppCard/AppCard.vue';
import AppOverlay from '@/components/AppOverlay/AppOverlay.vue';
import PartnerProfileInfoCard from '@/components/PartnerProfileInfoCard/PartnerProfileInfoCard.vue';

export default {
  components: {
    AppCard,
    AppOverlay,
    PartnerProfileInfoCard,
  },
  props: {},
  data() {
    return {
      dialog: false,
      saveLoading: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    close() {
      this.dialog = false;
    },
    save() {
      this.dialog = false
    },
  },
  created() { },
  mounted() { },
};
