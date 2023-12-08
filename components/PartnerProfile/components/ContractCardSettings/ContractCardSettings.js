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
      this.$emit('update:agency_contract', value);
    },
    validateContractForm() {
      const formRef = this.$refs.contract_card_settings_form;

      if (formRef) {
        if (!formRef.validate()) {
          return false;
        }
      }

      return true;
    },
    validate() {
      return this.validateContractForm();
    },
  },
  created() { },
  mounted() { },
};
