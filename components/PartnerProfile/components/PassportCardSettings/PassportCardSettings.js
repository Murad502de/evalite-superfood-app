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
      this.$emit('update:pass_full_name', value);
    },
    updateSeriesPass(value) {
      this.$emit('update:pass_series', value);
    },
    updateNumberPass(value) {
      this.$emit('update:pass_number', value);
    },
    updateIssueDatePass(value) {
      this.$emit('update:pass_issue_date', value);
    },
    updateRegistrationAddressPass(value) {
      this.$emit('update:pass_registration_address', value);
    },
    updateIssueByPass(value) {
      this.$emit('update:pass_issue_by', value);
    },
    updateDepartmentCodePass(value) {
      this.$emit('update:pass_department_code', value);
    },
    updateMainSpreadPass(value) {
      this.$emit('update:pass_main_spread', value);
    },
    updateRegistrationSpreadPass(value) {
      this.$emit('update:pass_registration_spread', value);
    },
    updateVerificationSpreadPass(value) {
      this.$emit('update:pass_verification_spread', value);
    },
  },
  created() { },
  mounted() { },
};
