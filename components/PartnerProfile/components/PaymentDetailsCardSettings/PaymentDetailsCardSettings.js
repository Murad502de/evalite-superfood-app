import AppCard from '@/components/AppCard/AppCard.vue';
import AppFormPaymentDetailsIE from '@/components/AppFormPaymentDetailsIE/AppFormPaymentDetailsIE.vue';

export default {
  components: {
    AppCard,
    AppFormPaymentDetailsIE,
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
    updateFullNameIE(value) {
      console.debug('VerDet/updateFullNameIE/value', value); //DELETE
      this.$emit('update:full_name_ie', value);
    },
    updateOrganizationLegalAddressIE(value) {
      console.debug('VerDet/updateOrganizationLegalAddressIE/value', value); //DELETE
      this.$emit('update:organization_legal_address_ie', value);
    },
    updateInnIE(value) {
      console.debug('VerDet/updateInnIE/value', value); //DELETE
      this.$emit('update:inn_ie', value);
    },
    updateOgrnIE(value) {
      console.debug('VerDet/updateOgrnIE/value', value); //DELETE
      this.$emit('update:ogrn_ie', value);
    },
    updateTransactionAccountIE(value) {
      console.debug('VerDet/updateTransactionAccountIE/value', value); //DELETE
      this.$emit('update:transaction_account_ie', value);
    },
    updateBankIE(value) {
      console.debug('VerDet/updateBankIE/value', value); //DELETE
      this.$emit('update:bank_ie', value);
    },
    updateBankInnIE(value) {
      console.debug('VerDet/updateBankInnIE/value', value); //DELETE
      this.$emit('update:bank_inn_ie', value);
    },
    updateBankBicIE(value) {
      console.debug('VerDet/updateBankBicIE/value', value); //DELETE
      this.$emit('update:bank_bic_ie', value);
    },
    updateBankCorrespondentAccountIE(value) {
      console.debug('VerDet/updateBankCorrespondentAccountIE/value', value); //DELETE
      this.$emit('update:bank_correspondent_account_ie', value);
    },
    updateBankLegalAddressIE(value) {
      console.debug('VerDet/updateBankLegalAddressIE/value', value); //DELETE
      this.$emit('update:bank_legal_address_ie', value);
    },
    updateConfirmDocIE(value) {
      console.debug('VerDet/updateConfirmDocIE/value', value); //DELETE
      this.$emit('update:confirm_doc_ie', value);
    },
  },
  created() { },
  mounted() { },
};
