import AppCard from '@/components/AppCard/AppCard.vue';
import AppFormPassport from '@/components/AppFormPassport/AppFormPassport.vue';

export default {
  components: {
    AppCard,
    AppFormPassport,
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
    updateFullNamePass(value) {
      console.debug('VerDet/updateFullNamePass', value); //DELETE
      this.$emit('update:pass_full_name', value);
    },
    updateSeriesPass(value) {
      console.debug('VerDet/updateSeriesPass', value); //DELETE
      this.$emit('update:pass_series', value);
    },
    updateNumberPass(value) {
      console.debug('VerDet/updateNumberPass', value); //DELETE
      this.$emit('update:pass_number', value);
    },
    updateIssueDatePass(value) {
      console.debug('VerDet/updateIssueDatePass', value); //DELETE
      this.$emit('update:pass_issue_date', value);
    },
    updateRegistrationAddressPass(value) {
      console.debug('VerDet/updateRegistrationAddressPass', value); //DELETE
      this.$emit('update:pass_registration_address', value);
    },
    updateIssueByPass(value) {
      console.debug('VerDet/updateIssueByPass', value); //DELETE
      this.$emit('update:pass_issue_by', value);
    },
    updateDepartmentCodePass(value) {
      console.debug('VerDet/updateDepartmentCodePass', value); //DELETE
      this.$emit('update:pass_department_code', value);
    },
    updateMainSpreadPass(value) {
      console.debug('VerDet/updateMainSpreadPass', value); //DELETE
      this.$emit('update:pass_main_spread', value);
    },
    updateRegistrationSpreadPass(value) {
      console.debug('VerDet/updateRegistrationSpreadPass', value); //DELETE
      this.$emit('update:pass_registration_spread', value);
    },
    updateVerificationSpreadPass(value) {
      console.debug('VerDet/updateVerificationSpreadPass', value); //DELETE
      this.$emit('update:pass_verification_spread', value);
    },
  },
  created() { },
  mounted() { },
};
