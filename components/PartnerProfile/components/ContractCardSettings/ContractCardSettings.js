import AppCard from '@/components/AppCard/AppCard.vue';
import AppFormDoc from '@/components/AppFormDoc/AppFormDoc.vue';

export default {
  components: {
    AppCard,
    AppFormDoc,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    saveLoading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tab: 0,
      valid: true,
    };
  },
  computed: {},
  watch: {},
  methods: {
    updateAgencyContract(value) {
      console.debug('VerDet/updateAgencyContract/value', value); //DELETE
      this.$emit('update:agency_contract', value);
    },
  },
  created() { },
  mounted() { },
};
