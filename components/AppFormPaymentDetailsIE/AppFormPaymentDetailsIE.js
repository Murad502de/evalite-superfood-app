import * as validation from "@/services/formValidation";
import AppFormMediaDoc from '@/components/AppFormMediaDoc/AppFormMediaDoc.vue';
import { createUploadedFileUrl } from '@/utils/file.js';

export default {
  components: {
    AppFormMediaDoc,
  },

  props: {},
  data() {
    return {
      valid: true,
      loading: false,
      ieFullName: '',
      ieFullNameRules: [
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

      if (this.ieFullName.length) {
        progress += 10;
      }
      if (this.organizationLegalAddress.length) {
        progress += 10;
      }
      if (this.inn.length) {
        progress += 10;
      }
      if (this.ogrn.length) {
        progress += 10;
      }
      if (this.transactionAccount.length) {
        progress += 10;
      }
      if (this.bank.length) {
        progress += 10;
      }
      if (this.bankInn.length) {
        progress += 10;
      }
      if (this.bankBic.length) {
        progress += 10;
      }
      if (this.bankCorrespondentAccount.length) {
        progress += 10;
      }
      if (this.bankLegalAddress.length) {
        progress += 5;
      }
      if (this.confirmDocFile) {
        progress += 5;
      }

      return progress;
    },
  },

  watch: {
    computedProgress(newVal) {
      this.$emit('update:progress', newVal);
    },
    ieFullName(newVal) {
      console.debug('IE/watch/ieFullName/newVal', newVal); //DELETE
      this.$emit('update:full_name', newVal);
    },
    organizationLegalAddress(newVal) {
      console.debug('IE/watch/organizationLegalAddress/newVal', newVal); //DELETE
      this.$emit('update:organization_legal_address', newVal);
    },
    inn(newVal) {
      console.debug('IE/watch/inn/newVal', newVal); //DELETE
      this.$emit('update:inn', newVal);
    },
    ogrn(newVal) {
      console.debug('IE/watch/ogrn/newVal', newVal); //DELETE
      this.$emit('update:ogrn', newVal);
    },
    transactionAccount(newVal) {
      console.debug('IE/watch/transactionAccount/newVal', newVal); //DELETE
      this.$emit('update:transaction_account', newVal);
    },
    bank(newVal) {
      console.debug('IE/watch/bank/newVal', newVal); //DELETE
      this.$emit('update:bank', newVal);
    },
    bankInn(newVal) {
      console.debug('IE/watch/bankInn/newVal', newVal); //DELETE
      this.$emit('update:bank_inn', newVal);
    },
    bankBic(newVal) {
      console.debug('IE/watch/bankBic/newVal', newVal); //DELETE
      this.$emit('update:bank_bic', newVal);
    },
    bankCorrespondentAccount(newVal) {
      console.debug('IE/watch/bankCorrespondentAccount/newVal', newVal); //DELETE
      this.$emit('update:bank_correspondent_account', newVal);
    },
    bankLegalAddress(newVal) {
      console.debug('IE/watch/bankLegalAddress/newVal', newVal); //DELETE
      this.$emit('update:bank_legal_address', newVal);
    },
    confirmDocFile(newVal) {
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
    validate() {
      this.confirmDocError = !this.confirmDocUrl;
      return this.$refs.form.validate() &&
        this.confirmDocUrl;
    },
    isDataNull() {
      console.debug('IE/methods/isDataNull/data', this.data); //DELETE
      return this.data === null;
    },
  },
  created() { },
  mounted() { },
}
