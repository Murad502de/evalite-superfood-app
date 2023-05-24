import * as validation from "@/services/formValidation";
import * as formPlaceholder from "@/services/formPlaceholder";
import AppFormMedia from '@/components/AppFormMedia/AppFormMedia.vue';
import PassportSpreadMainSvg from '@/assets/svg/passport_spread_main.svg';
import PassportSpreadRegistrationSvg from '@/assets/svg/passport_spread_registration.svg';
import PassportSpreadVerificationSvg from '@/assets/svg/passport_verification.svg';
import { createUploadedFileUrl } from '@/utils/file.js';
import AppTextField from '@/components/AppTextField/AppTextField.vue';

export default {
  components: {
    AppTextField,
    AppFormMedia,
    PassportSpreadMainSvg,
    PassportSpreadRegistrationSvg,
    PassportSpreadVerificationSvg,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    data: {
      type: Object | null,
      required: true,
    },
    loading: {
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
      valid: true,
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
      if (this.passFullName && this.passFullName.length) progress += 10;
      if (this.passSeries && this.passSeries.length) progress += 10;
      if (this.passNumber && this.passNumber.length) progress += 10;
      if (this.passIssueDate && this.passIssueDate.length) progress += 10;
      if (this.passRegistrationAddress && this.passRegistrationAddress.length) progress += 10;
      if (this.passIssuedBy && this.passIssuedBy.length) progress += 10;
      if (this.passDepartmentCode && this.passDepartmentCode.length) progress += 10;
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
    data(newVal) {
      console.debug('AppFormPassport/watch/data/newVal', newVal); //DELETE
      this.init(newVal);
    },
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
    init(value) {
      console.debug('AppFormPassport/methods/init/value', value); //DELETE

      if (value === null) {
        this.passFullName = null;
        this.passSeries = null;
        this.passNumber = null;
        this.passIssueDate = null;
        this.passRegistrationAddress = null;
        this.passIssuedBy = null;
        this.passDepartmentCode = null;
        this.mainSpreadMediaUrl = null;
        this.registrationSpreadMediaUrl = null;
        this.verificationSpreadMediaUrl = null;
        return;
      }

      this.passFullName = value.passport.fullName;
      this.passSeries = value.passport.series;
      this.passNumber = value.passport.number;
      this.passIssueDate = value.passport.issueDate;
      this.passRegistrationAddress = value.passport.registrationAddress;
      this.passIssuedBy = value.passport.issueBy;
      this.passDepartmentCode = value.passport.departmentCode;
      this.mainSpreadMediaUrl = value.passport.mainSpread;
      this.registrationSpreadMediaUrl = value.passport.registrationSpread;
      this.verificationSpreadMediaUrl = value.passport.verificationSpread;
    },
    validate() {
      this.mainSpreadMediaError = !this.mainSpreadMediaUrl;
      this.registrationSpreadMediaError = !this.registrationSpreadMediaUrl;
      this.verificationSpreadMediaError = !this.verificationSpreadMediaUrl;
      return this.$refs.form.validate() &&
        this.mainSpreadMediaUrl &&
        this.registrationSpreadMediaUrl &&
        this.verificationSpreadMediaUrl;
    },
  },
  created() {
    console.debug('AppFormPassport/created/data', this.data); //DELETE
    this.init(this.data);
  },
  mounted() { },
}
