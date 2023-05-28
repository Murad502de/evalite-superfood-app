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
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: true,
      fullName: null,
      fullNameRules: [
        validation.required(),
      ],
      transactionAccount: null,
      transactionAccountRules: [
        validation.required(),
        validation.numbers(),
      ],
      inn: null,
      innRules: [
        validation.required(),
        validation.numbers(),
      ],
      swift: null,
      swiftRules: [
        validation.required(),
      ],
      mailingAddress: null,
      mailingAddressRules: [
        validation.required(),
      ],
      bank: null,
      bankRules: [
        validation.required(),
      ],
      bic: null,
      bicRules: [
        validation.required(),
        validation.numbers(),
      ],
      correspondentAccount: null,
      correspondentAccountRules: [
        validation.required(),
        validation.numbers(),
      ],
      bankInn: null,
      bankInnRules: [
        validation.required(),
        validation.numbers(),
      ],
      bankKpp: null,
      bankKppRules: [
        validation.required(),
        validation.numbers(),
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
      if (this.transactionAccount && this.transactionAccount.length) progress += 10;
      if (this.bank && this.bank.length) progress += 10;
      if (this.bic && this.bic.length) progress += 10;
      if (this.correspondentAccount && this.correspondentAccount.length) progress += 10;
      if (this.bankInn && this.bankInn.length) progress += 10;
      if (this.bankKpp && this.bankKpp.length) progress += 10;
      if (this.confirmDocFile) progress += 30;
      return progress;
    },
  },
  watch: {
    data(newVal) {
      console.debug('SE/watch/data/newVal', newVal); //DELETE
      this.init(newVal);
    },
    computedProgress(newVal) {
      this.$emit('update:progress', newVal);
    },
    fullName(newVal, oldVal) {
      // if (this.isDataNull()) return;
      if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('SE/watch/fullName', newVal); //DELETE
      this.$emit('update:full_name', newVal);
    },
    transactionAccount(newVal, oldVal) {
      // if (this.isDataNull()) return;
      if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('SE/watch/transactionAccount', newVal); //DELETE
      this.$emit('update:transaction_account', newVal);
    },
    inn(newVal, oldVal) {
      // if (this.isDataNull()) return;
      if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('SE/watch/inn', newVal); //DELETE
      this.$emit('update:inn', newVal);
    },
    swift(newVal, oldVal) {
      // if (this.isDataNull()) return;
      if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('SE/watch/swift', newVal); //DELETE
      this.$emit('update:swift', newVal);
    },
    mailingAddress(newVal, oldVal) {
      // if (this.isDataNull()) return;
      if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('SE/watch/mailingAddress', newVal); //DELETE
      this.$emit('update:mailing_address', newVal);
    },
    bank(newVal, oldVal) {
      // if (this.isDataNull()) return;
      if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('SE/watch/bank', newVal); //DELETE
      this.$emit('update:bank', newVal);
    },
    bic(newVal, oldVal) {
      // if (this.isDataNull()) return;
      if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('SE/watch/bic', newVal); //DELETE
      this.$emit('update:bic', newVal);
    },
    correspondentAccount(newVal, oldVal) {
      // if (this.isDataNull()) return;
      if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('SE/watch/correspondentAccount', newVal); //DELETE
      this.$emit('update:correspondent_account', newVal);
    },
    bankInn(newVal, oldVal) {
      // if (this.isDataNull()) return;
      if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('SE/watch/bankInn', newVal); //DELETE
      this.$emit('update:bank_inn', newVal);
    },
    bankKpp(newVal, oldVal) {
      // if (this.isDataNull()) return;
      if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('SE/watch/bankKpp', newVal); //DELETE
      this.$emit('update:bank_kpp', newVal);
    },
    confirmDocFile(newVal, oldVal) {
      if (this.isDataNull()) return;
      // if (newVal === null || oldVal === null || this.isDataNull()) return;
      console.debug('SE/watch/confirmDocFile', newVal); //DELETE
      this.$emit('update:confirm_doc', newVal);
    },
  },
  methods: {
    uploadConfirmDoc(file = null) {
      if (this.loading || this.disabled) return;
      //TODO call validate service
      console.debug(file); //DELETE
      this.confirmDocFile = file;
      this.confirmDocName = file.name;
      this.confirmDocUrl = createUploadedFileUrl(file);
      this.confirmDocError = false;
    },
    deleteConfirmDoc() {
      if (this.loading || this.disabled) return;
      this.confirmDocFile = null;
      this.confirmDocName = null;
      this.confirmDocUrl = null;
    },
    init(value) {
      console.debug('AppFormPaymentDetailsSE/methods/init/value', value); //DELETE

      if (value === null) {
        this.fullName = null;
        this.transactionAccount = null;
        this.inn = null;
        this.swift = null;
        this.mailingAddress = null;
        this.bank = null;
        this.bic = null;
        this.correspondentAccount = null;
        this.bankInn = null;
        this.bankKpp = null;
        this.confirmDocFile = null;
        this.confirmDocName = null;
        this.confirmDocUrl = null;
        this.confirmDocError = false;
        return;
      }

      this.fullName = value.paymentDetailsSelfEmployed.fullName;
      this.transactionAccount = value.paymentDetailsSelfEmployed.transactionAccount;
      this.inn = value.paymentDetailsSelfEmployed.inn;
      this.swift = value.paymentDetailsSelfEmployed.swift;
      this.mailingAddress = value.paymentDetailsSelfEmployed.mailingAddress;
      this.bank = value.paymentDetailsSelfEmployed.bank;
      this.bic = value.paymentDetailsSelfEmployed.bic;
      this.correspondentAccount = value.paymentDetailsSelfEmployed.correspondentAccount;
      this.bankInn = value.paymentDetailsSelfEmployed.bankInn;
      this.bankKpp = value.paymentDetailsSelfEmployed.bankKpp;
      this.confirmDocUrl = value.paymentDetailsSelfEmployed.confirmDoc;
    },
    validate() {
      this.confirmDocError = !this.confirmDocUrl;
      return this.$refs.form.validate() &&
        this.confirmDocUrl;
    },
    isDataNull() {
      console.debug('SE/methods/isDataNull/data', this.data); //DELETE
      return this.data === null;
    },
  },
  created() {
    console.debug('AppFormPaymentDetailsSE/created/data', this.data); //DELETE
    this.init(this.data);
  },
  mounted() { },
}
