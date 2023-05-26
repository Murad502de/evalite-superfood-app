import * as validation from "@/services/formValidation";
import * as formPlaceholder from "@/services/formPlaceholder";
import { createUploadedFileUrl } from '@/utils/file.js';
import AppFormMedia from '@/components/AppFormMedia/AppFormMedia.vue';
import PassportSpreadMainSvg from '@/assets/svg/passport_spread_main.svg';
import PassportSpreadRegistrationSvg from '@/assets/svg/passport_spread_registration.svg';
import PassportSpreadVerificationSvg from '@/assets/svg/passport_verification.svg';
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
      passFullName: null,
      passFullNameRules: [
        validation.required(),
      ],
      passSeries: null,
      passSeriesRules: [
        validation.required(),
        validation.numbers(),
      ],
      passNumber: null,
      passNumberRules: [
        validation.required(),
        validation.numbers(),
      ],
      passIssueDate: null,
      passIssueDateRules: [
        validation.required(),
        validation.date(),
      ],
      passRegistrationAddress: null,
      passRegistrationAddressRules: [
        validation.required(),
      ],
      passIssuedBy: null,
      passIssuedByRules: [
        validation.required(),
      ],
      passDepartmentCode: null,
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
    passFullName(newVal, oldVal) {
      if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('PS/watch/passFullName', newVal); //DELETE
      this.$emit('update:full_name', newVal);
    },
    passSeries(newVal, oldVal) {
      if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('PS/watch/passSeries', newVal); //DELETE
      this.$emit('update:series', newVal);
    },
    passNumber(newVal, oldVal) {
      if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('PS/watch/passNumber', newVal); //DELETE
      this.$emit('update:number', newVal);
    },
    passIssueDate(newVal, oldVal) {
      if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('PS/watch/passIssueDate', newVal); //DELETE
      this.$emit('update:issue_date', newVal);
    },
    passRegistrationAddress(newVal, oldVal) {
      if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('PS/watch/passRegistrationAddress', newVal); //DELETE
      this.$emit('update:registration_address', newVal);
    },
    passIssuedBy(newVal, oldVal) {
      if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('PS/watch/passIssuedBy', newVal); //DELETE
      this.$emit('update:issue_by', newVal);
    },
    passDepartmentCode(newVal, oldVal) {
      if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('PS/watch/passDepartmentCode', newVal); //DELETE
      this.$emit('update:department_code', newVal);
    },
    mainSpreadMediaFile(newVal) {
      console.debug('PS/watch/mainSpreadMediaFile/BEFORE', newVal); //DELETE

      if (this.isDataNull()) return;
      console.debug('PS/watch/mainSpreadMediaFile', newVal); //DELETE
      this.$emit('update:main_spread', newVal);
    },
    registrationSpreadMediaFile(newVal) {
      if (this.isDataNull()) return;
      console.debug('PS/watch/registrationSpreadMediaFile', newVal); //DELETE
      this.$emit('update:registration_spread', newVal);
    },
    verificationSpreadMediaFile(newVal) {
      if (this.isDataNull()) return;
      console.debug('PS/watch/verificationSpreadMediaFile', newVal); //DELETE
      this.$emit('update:verification_spread', newVal);
    },
  },
  methods: {
    uploadMainSpread(file = null) {
      if (this.loading || this.disabled) return;
      //TODO call validate service
      console.debug(file); //DELETE
      this.mainSpreadMediaFile = file;
      this.mainSpreadMediaName = file.name;
      this.mainSpreadMediaUrl = createUploadedFileUrl(file);
      this.mainSpreadMediaError = false;
    },
    deleteMainSpread() {
      if (this.loading || this.disabled) return;
      this.mainSpreadMediaFile = null;
      this.mainSpreadMediaName = null;
      this.mainSpreadMediaUrl = null;
    },
    uploadRegistrationSpread(file = null) {
      if (this.loading || this.disabled) return;
      //TODO call validate service
      this.registrationSpreadMediaFile = file;
      this.registrationSpreadMediaName = file.name;
      this.registrationSpreadMediaUrl = createUploadedFileUrl(file);
      this.registrationSpreadMediaError = false;
    },
    deleteRegistrationSpread() {
      if (this.loading || this.disabled) return;
      this.registrationSpreadMediaFile = null;
      this.registrationSpreadMediaName = null;
      this.registrationSpreadMediaUrl = null;
    },
    uploadVerificationSpread(file = null) {
      if (this.loading || this.disabled) return;
      //TODO call validate service
      this.verificationSpreadMediaFile = file;
      this.verificationSpreadMediaName = file.name;
      this.verificationSpreadMediaUrl = createUploadedFileUrl(file);
      this.verificationSpreadMediaError = false;
    },
    deleteVerificationSpread() {
      if (this.loading || this.disabled) return;
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
    isDataNull() {
      return this.data === null;
    },
  },
  created() {
    console.debug('AppFormPassport/created/data', this.data); //DELETE
    this.init(this.data);
  },
  mounted() { },
}
