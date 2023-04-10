import AppFormMedia from '@/components/AppFormMedia/AppFormMedia.vue';
import PassportSpreadMainSvg from '@/assets/svg/passport_spread_main.svg';
import PassportSpreadRegistrationSvg from '@/assets/svg/passport_spread_registration.svg';
import PassportSpreadVerificationSvg from '@/assets/svg/passport_verification.svg';
import { createUploadedFileUrl } from '@/utils/file.js';

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
      valid: true,
      loading: false,
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
      mainSpreadMediaName: null,
      mainSpreadMediaUrl: null,
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

      //TODO call validate service

      this.mainSpreadMediaName = file.name;
      this.mainSpreadMediaUrl = createUploadedFileUrl(file);
    },
    deleteMainSpread() {
      this.mainSpreadMediaName = null;
      this.mainSpreadMediaUrl = null;
    },

    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
