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
      seFullName: '',
      seFullNameRules: [
        validation.required(),
      ],
      transactionAccount: '',
      transactionAccountRules: [
        validation.required(),
        validation.numbers(),
      ],
      seInn: '',
      seInnRules: [
        validation.required(),
        validation.numbers(),
      ],
      seSwift: '',
      seSwiftRules: [
        validation.required(),
      ],
      seMailingAddress: '',
      seMailingAddressRules: [
        validation.required(),
      ],
      seBank: '',
      seBankRules: [
        validation.required(),
      ],
      bic: '',
      bicRules: [
        validation.required(),
        validation.numbers(),
      ],
      correspondentAccount: '',
      correspondentAccountRules: [
        validation.required(),
        validation.numbers(),
      ],
      bankInn: '',
      bankInnRules: [
        validation.required(),
        validation.numbers(),
      ],
      bankKpp: '',
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

      if (this.seFullName.length) {
        progress += 10;
      }
      if (this.transactionAccount.length) {
        progress += 10;
      }
      if (this.seBank.length) {
        progress += 10;
      }
      if (this.bic.length) {
        progress += 10;
      }
      if (this.correspondentAccount.length) {
        progress += 10;
      }
      if (this.bankInn.length) {
        progress += 10;
      }
      if (this.bankKpp.length) {
        progress += 10;
      }
      if (this.confirmDocFile) {
        progress += 30;
      }

      return progress;
    },
  },

  watch: {
    computedProgress(newVal) {
      this.$emit('update:progress', newVal);
    },
    seFullName(newVal) {
      console.debug('SE/watch/seFullName', newVal); //DELETE
      this.$emit('update:full_name', newVal);
    },
    transactionAccount(newVal) {
      console.debug('SE/watch/transactionAccount', newVal); //DELETE
      this.$emit('update:transaction_account', newVal);
    },
    seInn(newVal) {
      console.debug('SE/watch/seInn', newVal); //DELETE
      this.$emit('update:inn', newVal);
    },
    seSwift(newVal) {
      console.debug('SE/watch/seSwift', newVal); //DELETE
      this.$emit('update:swift', newVal);
    },
    seMailingAddress(newVal) {
      console.debug('SE/watch/seMailingAddress', newVal); //DELETE
      this.$emit('update:mailing_address', newVal);
    },
    seBank(newVal) {
      console.debug('SE/watch/seBank', newVal); //DELETE
      this.$emit('update:bank', newVal);
    },
    bic(newVal) {
      console.debug('SE/watch/bic', newVal); //DELETE
      this.$emit('update:bic', newVal);
    },
    correspondentAccount(newVal) {
      console.debug('SE/watch/correspondentAccount', newVal); //DELETE
      this.$emit('update:correspondent_account', newVal);
    },
    bankInn(newVal) {
      console.debug('SE/watch/bankInn', newVal); //DELETE
      this.$emit('update:bank_inn', newVal);
    },
    bankKpp(newVal) {
      console.debug('SE/watch/bankKpp', newVal); //DELETE
      this.$emit('update:bank_kpp', newVal);
    },
    confirmDocFile(newVal) {
      console.debug('SE/watch/confirmDocFile', newVal); //DELETE
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
  },

  created() { },
  mounted() { },
}
