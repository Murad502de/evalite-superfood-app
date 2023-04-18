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
      ieFullNameRules: [],
      organizationLegalAddress: '',
      organizationLegalAddressRules: [],
      inn: '',
      innRules: [],
      ogrn: '',
      ogrnRules: [],
      transactionAccount: '',
      transactionAccountRules: [],
      bank: '',
      bankRules: [],
      bankInn: '',
      bankInnRules: [],
      bankBic: '',
      bankBicRules: [],
      bankCorrespondentAccount: '',
      bankCorrespondentAccountRules: [],
      bankLegalAddress: '',
      bankLegalAddressRules: [],
      confirmDocFile: null,
      confirmDocName: '',
      confirmDocUrl: '',
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
  },
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    uploadConfirmDoc(file = null) {
      //TODO call validate service

      console.debug(file); //DELETE

      this.confirmDocFile = file;
      this.confirmDocName = file.name;
      this.confirmDocUrl = createUploadedFileUrl(file);
    },
    deleteConfirmDoc() {
      this.confirmDocFile = null;
      this.confirmDocName = null;
      this.confirmDocUrl = null;
    },

    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
