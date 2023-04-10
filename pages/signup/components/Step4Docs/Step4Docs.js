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
      mainSpreadMediaFile: null,
      mainSpreadMediaName: null,
      mainSpreadMediaUrl: null,
      registrationSpreadMediaFile: null,
      registrationSpreadMediaName: null,
      registrationSpreadMediaUrl: null,
      verificationSpreadMediaFile: null,
      verificationSpreadMediaName: null,
      verificationSpreadMediaUrl: null,
    };
  },
  computed: {},

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    uploadMainSpread(file = null) {
      //TODO call validate service

      this.mainSpreadMediaFile = file;
      this.mainSpreadMediaName = file.name;
      this.mainSpreadMediaUrl = createUploadedFileUrl(file);
    },
    deleteMainSpread() {
      this.mainSpreadMediaFile = null;
      this.mainSpreadMediaName = null;
      this.mainSpreadMediaUrl = null;
    },
    uploadRegistrationSpread(file = null) {
      //TODO call validate service

      this.registrationSpreadMediaFile = file;
      this.registrationSpreadMediaName = file.name;
      this.registrationSpreadMediaUrl = createUploadedFileUrl(file);
    },
    deleteRegistrationSpread() {
      this.registrationSpreadMediaFile = null;
      this.registrationSpreadMediaName = null;
      this.registrationSpreadMediaUrl = null;
    },
    uploadVerificationSpread(file = null) {
      //TODO call validate service

      this.verificationSpreadMediaFile = file;
      this.verificationSpreadMediaName = file.name;
      this.verificationSpreadMediaUrl = createUploadedFileUrl(file);
    },
    deleteVerificationSpread() {
      this.verificationSpreadMediaFile = null;
      this.verificationSpreadMediaName = null;
      this.verificationSpreadMediaUrl = null;
    },

    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
