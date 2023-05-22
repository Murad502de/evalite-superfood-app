import * as validation from "@/services/formValidation";
import * as formPlaceholder from "@/services/formPlaceholder";
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
      passFullNameRules: [
        validation.required(),
      ],
      passSeries: '',
      passSeriesRules: [
        validation.required(),
        validation.numbers(),
      ],
      passNumber: '',
      passNumberRules: [
        validation.required(),
        validation.numbers(),
      ],
      passIssueDate: '',
      passIssueDateRules: [
        validation.required(),
        validation.date(),
      ],
      passRegistrationAddress: '',
      passRegistrationAddressRules: [
        validation.required(),
      ],
      passIssuedBy: '',
      passIssuedByRules: [
        validation.required(),
      ],
      passDepartmentCode: '',
      passDepartmentCodeRules: [
        validation.required(),
        validation.numbers(),
      ],
      mainSpreadMediaFile: null,
      mainSpreadMediaName: null,
      mainSpreadMediaUrl: null,
      mainSpreadMediaError: false,
      registrationSpreadMediaFile: null,
      registrationSpreadMediaName: null,
      registrationSpreadMediaUrl: null,
      registrationSpreadMediaError: false,
      verificationSpreadMediaFile: null,
      verificationSpreadMediaName: null,
      verificationSpreadMediaUrl: null,
      verificationSpreadMediaError: false,
    };
  },
  computed: {
    computedProgress() {
      let progress = 0;
      if (this.passFullName.length) progress += 10;
      if (this.passSeries.length) progress += 10;
      if (this.passNumber.length) progress += 10;
      if (this.passIssueDate.length) progress += 10;
      if (this.passRegistrationAddress.length) progress += 10;
      if (this.passIssuedBy.length) progress += 10;
      if (this.passDepartmentCode.length) progress += 10;
      if (this.mainSpreadMediaFile) progress += 10;
      if (this.registrationSpreadMediaFile) progress += 10;
      if (this.verificationSpreadMediaFile) progress += 10;
      return progress;
    },
    formPlaceholder() {
      return formPlaceholder;
    },
  },
  watch: {
    computedProgress(newVal) {
      this.$emit('update:progress', newVal);
    },
    passFullName(newVal) {
      this.$emit('update:pass_full_name', newVal);
    },
    passSeries(newVal) {
      this.$emit('update:pass_series', newVal);
    },
    passNumber(newVal) {
      this.$emit('update:pass_number', newVal);
    },
    passIssueDate(newVal) {
      this.$emit('update:pass_issue_date', newVal);
    },
    passRegistrationAddress(newVal) {
      this.$emit('update:pass_registration_address', newVal);
    },
    passIssuedBy(newVal) {
      this.$emit('update:pass_issue_by', newVal);
    },
    passDepartmentCode(newVal) {
      this.$emit('update:pass_department_code', newVal);
    },
    mainSpreadMediaFile(newVal) {
      this.$emit('update:passport_main_spread', newVal);
    },
    registrationSpreadMediaFile(newVal) {
      this.$emit('update:passport_registration_spread', newVal);
    },
    verificationSpreadMediaFile(newVal) {
      this.$emit('update:passport_verification_spread', newVal);
    },
  },
  methods: {
    uploadMainSpread(file = null) {
      //TODO call validate service
      console.debug(file); //DELETE
      this.mainSpreadMediaFile = file;
      this.mainSpreadMediaName = file.name;
      this.mainSpreadMediaUrl = createUploadedFileUrl(file);
      this.mainSpreadMediaError = false;
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
      this.registrationSpreadMediaError = false;
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
      this.verificationSpreadMediaError = false;
    },
    deleteVerificationSpread() {
      this.verificationSpreadMediaFile = null;
      this.verificationSpreadMediaName = null;
      this.verificationSpreadMediaUrl = null;
    },
  },
  created() { },
  mounted() { },
}
