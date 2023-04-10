import AppFormMedia from '@/components/AppFormMedia/AppFormMedia.vue';
import PassportSpreadMainSvg from '@/assets/svg/passport_spread_main.svg';
import PassportSpreadRegistrationSvg from '@/assets/svg/passport_spread_registration.svg';
import PassportSpreadVerificationSvg from '@/assets/svg/passport_verification.svg';

export default {
  components: {
    AppFormMedia,
    PassportSpreadMainSvg,
    PassportSpreadRegistrationSvg,
    PassportSpreadVerificationSvg,
  },

  props: {},
  data() {
    return {
      disabled: false, //DELETE

      valid: true,
      loading: false,
      mainSpreadFile: null,
      passFullName: '',
      passFullNameRules: [],
      passSeries: '',
      passSeriesRules: [],
      passNumber: '',
      passNumberRules: [],
      passIssueDate: '',
      passIssueDateRules: [],
      passValidity: '',
      passValidityRules: [],
      passIssuedBy: '',
      passIssuedByRules: [],
      passDepartmentCode: '',
      passDepartmentCodeRules: [],
    };
  },
  computed: {},

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    uploadMainSpread(file = null) {
      console.debug('Step4Docs/handlers/uploadMainSpread', file); //DELETE

      this.mainSpreadFile = file;
    },
    deleteMainSpread() {
      this.mainSpreadFile = null;
    },

    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
