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
      seFullName: '',
      seFullNameRules: [],
      transactionAccount: '',
      transactionAccountRules: [],
      seBank: '',
      seBankRules: [],
      bic: '',
      bicRules: [],
      correspondentAccount: '',
      correspondentAccountRules: [],
      bankInn: '',
      bankInnRules: [],
      bankKpp: '',
      bankKppRules: [],
      confirmDocFile: null,
      confirmDocName: '',
      confirmDocUrl: '',
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
