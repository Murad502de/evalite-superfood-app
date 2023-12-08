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
    updateFullName(value) {
      // console.debug('VerDet/updateFullNameIE/value', value); //DELETE
      this.$emit('update:full_name', value);
    },
    updateOrganizationLegalAddress(value) {
      // console.debug('VerDet/updateOrganizationLegalAddressIE/value', value); //DELETE
      this.$emit('update:organization_legal_address', value);
    },
    updateInn(value) {
      // console.debug('VerDet/updateInnIE/value', value); //DELETE
      this.$emit('update:inn', value);
    },
    updateOgrn(value) {
      // console.debug('VerDet/updateOgrnIE/value', value); //DELETE
      this.$emit('update:ogrn', value);
    },
    updateTransactionAccount(value) {
      // console.debug('VerDet/updateTransactionAccountIE/value', value); //DELETE
      this.$emit('update:transaction_account', value);
    },
    updateBank(value) {
      // console.debug('VerDet/updateBankIE/value', value); //DELETE
      this.$emit('update:bank', value);
    },
    updateBankInn(value) {
      // console.debug('VerDet/updateBankInnIE/value', value); //DELETE
      this.$emit('update:bank_inn', value);
    },
    updateBankBic(value) {
      // console.debug('VerDet/updateBankBicIE/value', value); //DELETE
      this.$emit('update:bank_bic', value);
    },
    updateBankCorrespondentAccount(value) {
      // console.debug('VerDet/updateBankCorrespondentAccountIE/value', value); //DELETE
      this.$emit('update:bank_correspondent_account', value);
    },
    updateBankLegalAddress(value) {
      // console.debug('VerDet/updateBankLegalAddressIE/value', value); //DELETE
      this.$emit('update:bank_legal_address', value);
    },
    updateConfirmDoc(value) {
      // console.debug('VerDet/updateConfirmDocIE/value', value); //DELETE
      this.$emit('update:confirm_doc', value);
    },
    validatePaymentDetailsForm() {
      const formRef = this.$refs.payment_details_ie_settings_form;

      if (formRef) {
        if (!formRef.validate()) {
          return false;
        }
      }

      return true;
    },
    validate() {
      return this.validatePaymentDetailsForm();
    },
  },
  created() { },
  mounted() { },
};
