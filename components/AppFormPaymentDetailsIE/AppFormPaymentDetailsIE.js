import * as validation from "@/services/formValidation";
import { createUploadedFileUrl } from '@/utils/file.js';
import AppTextField from '@/components/AppTextField/AppTextField.vue';
import AppFormMediaDoc from '@/components/AppFormMediaDoc/AppFormMediaDoc.vue';

export default {
  components: {
    AppTextField,
    AppFormMediaDoc,
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
      fullName: '',
      fullNameRules: [
        validation.required(),
      ],
      organizationLegalAddress: '',
      organizationLegalAddressRules: [
        validation.required(),
      ],
      inn: '',
      innRules: [
        validation.required(),
        validation.numbers(),
      ],
      ogrn: '',
      ogrnRules: [
        validation.required(),
        validation.numbers(),
      ],
      transactionAccount: '',
      transactionAccountRules: [
        validation.required(),
        validation.numbers(),
      ],
      bank: '',
      bankRules: [
        validation.required(),
      ],
      bankInn: '',
      bankInnRules: [
        validation.required(),
        validation.numbers(),
      ],
      bankBic: '',
      bankBicRules: [
        validation.required(),
        validation.numbers(),
      ],
      bankCorrespondentAccount: '',
      bankCorrespondentAccountRules: [
        validation.required(),
        validation.numbers(),
      ],
      bankLegalAddress: '',
      bankLegalAddressRules: [
        validation.required(),
      ],
      confirmDocFile: null,
      confirmDocName: '',
      confirmDocUrl: '',
      confirmDocError: false,
    };
  },
  computed: {
    computedProgress() {
      let progress = 0;
      if (this.fullName && this.fullName.length) progress += 10;
      if (this.organizationLegalAddress && this.organizationLegalAddress.length) progress += 10;
      if (this.inn && this.inn.length) progress += 10;
      if (this.ogrn && this.ogrn.length) progress += 10;
      if (this.transactionAccount && this.transactionAccount.length) progress += 10;
      if (this.bank && this.bank.length) progress += 10;
      if (this.bankInn && this.bankInn.length) progress += 10;
      if (this.bankBic && this.bankBic.length) progress += 10;
      if (this.bankCorrespondentAccount && this.bankCorrespondentAccount.length) progress += 10;
      if (this.bankLegalAddress && this.bankLegalAddress.length) progress += 5;
      if (this.confirmDocFile) progress += 5;
      return progress;
    },
  },

  watch: {
    data(newVal) {
      this.init(newVal);
    },
    computedProgress(newVal) {
      this.$emit('update:progress', newVal);
    },
    fullName(newVal) {
      if (this.isDataNull()) return;
      console.debug('IE/watch/fullName/newVal', newVal); //DELETE
      this.$emit('update:full_name', newVal);
    },
    organizationLegalAddress(newVal) {
      if (this.isDataNull()) return;
      console.debug('IE/watch/organizationLegalAddress/newVal', newVal); //DELETE
      this.$emit('update:organization_legal_address', newVal);
    },
    inn(newVal) {
      if (this.isDataNull()) return;
      console.debug('IE/watch/inn/newVal', newVal); //DELETE
      this.$emit('update:inn', newVal);
    },
    ogrn(newVal) {
      if (this.isDataNull()) return;
      console.debug('IE/watch/ogrn/newVal', newVal); //DELETE
      this.$emit('update:ogrn', newVal);
    },
    transactionAccount(newVal) {
      if (this.isDataNull()) return;
      console.debug('IE/watch/transactionAccount/newVal', newVal); //DELETE
      this.$emit('update:transaction_account', newVal);
    },
    bank(newVal) {
      if (this.isDataNull()) return;
      console.debug('IE/watch/bank/newVal', newVal); //DELETE
      this.$emit('update:bank', newVal);
    },
    bankInn(newVal) {
      if (this.isDataNull()) return;
      console.debug('IE/watch/bankInn/newVal', newVal); //DELETE
      this.$emit('update:bank_inn', newVal);
    },
    bankBic(newVal) {
      if (this.isDataNull()) return;
      console.debug('IE/watch/bankBic/newVal', newVal); //DELETE
      this.$emit('update:bank_bic', newVal);
    },
    bankCorrespondentAccount(newVal) {
      if (this.isDataNull()) return;
      console.debug('IE/watch/bankCorrespondentAccount/newVal', newVal); //DELETE
      this.$emit('update:bank_correspondent_account', newVal);
    },
    bankLegalAddress(newVal) {
      if (this.isDataNull()) return;
      console.debug('IE/watch/bankLegalAddress/newVal', newVal); //DELETE
      this.$emit('update:bank_legal_address', newVal);
    },
    confirmDocFile(newVal) {
      if (this.isDataNull()) return;
      console.debug('IE/watch/confirmDocFile/newVal', newVal); //DELETE
      this.$emit('update:confirm_doc', newVal);
    },
  },
  methods: {
    uploadConfirmDoc(file = null) {
      //TODO call validate service
      console.debug(file); //DELETE
      this.confirmDocFile = file;
      this.confirmDocName = file.name;
      this.confirmDocUrl = createUploadedFileUrl(file);
      this.confirmDocError = false;
    },
    deleteConfirmDoc() {
      this.confirmDocFile = null;
      this.confirmDocName = null;
      this.confirmDocUrl = null;
    },
    init(value) {
      if (value === null) {
        this.fullName = null;
        this.organizationLegalAddress = null;
        this.inn = null;
        this.ogrn = null;
        this.transactionAccount = null;
        this.bank = null;
        this.bankInn = null;
        this.bankBic = null;
        this.bankCorrespondentAccount = null;
        this.bankLegalAddress = null;
        this.confirmDocFile = null;
        this.confirmDocName = null;
        this.confirmDocUrl = null;
        this.confirmDocError = false;
        return;
      }

      this.fullName = value.paymentDetailsIndividualEntrepreneur.fullName;
      this.organizationLegalAddress = value.paymentDetailsIndividualEntrepreneur.organizationLegalAddress;
      this.inn = value.paymentDetailsIndividualEntrepreneur.inn;
      this.ogrn = value.paymentDetailsIndividualEntrepreneur.ogrn;
      this.transactionAccount = value.paymentDetailsIndividualEntrepreneur.transactionAccount;
      this.bank = value.paymentDetailsIndividualEntrepreneur.bank;
      this.bankInn = value.paymentDetailsIndividualEntrepreneur.bankInn;
      this.bankBic = value.paymentDetailsIndividualEntrepreneur.bankBic;
      this.bankCorrespondentAccount = value.paymentDetailsIndividualEntrepreneur.bankCorrespondentAccount;
      this.bankLegalAddress = value.paymentDetailsIndividualEntrepreneur.bankLegalAddress;
      this.confirmDocUrl = value.paymentDetailsIndividualEntrepreneur.confirmDoc;
    },
    validate() {
      this.confirmDocError = !this.confirmDocUrl;
      return this.$refs.form.validate() &&
        this.confirmDocUrl;
    },
    isDataNull() {
      return this.data === null;
    },
  },
  created() {
    console.debug('AppFormPaymentDetailsSE/created/data', this.data); //DELETE
    this.init(this.data);
  },
  mounted() { },
}
