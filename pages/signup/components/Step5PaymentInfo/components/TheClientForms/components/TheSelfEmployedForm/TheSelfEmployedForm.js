import { mapActions, mapGetters, } from 'vuex';
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
    ...mapGetters('userSignupStore', ['userSignupData']), //DELETE
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
      this.setUserSignupData({ se_full_name: newVal });
    },
    transactionAccount(newVal) {
      this.setUserSignupData({ se_transaction_account: newVal });
    },
    seInn(newVal) {
      this.setUserSignupData({ se_inn: newVal });
    },
    seSwift(newVal) {
      this.setUserSignupData({ se_swift: newVal });
    },
    seMailingAddress(newVal) {
      this.setUserSignupData({ se_mailing_address: newVal });
    },
    seBank(newVal) {
      this.setUserSignupData({ se_bank: newVal });
    },
    bic(newVal) {
      this.setUserSignupData({ se_bic: newVal });
    },
    correspondentAccount(newVal) {
      this.setUserSignupData({ se_correspondent_account: newVal });
    },
    bankInn(newVal) {
      this.setUserSignupData({ se_bank_inn: newVal });
    },
    bankKpp(newVal) {
      this.setUserSignupData({ se_bank_kpp: newVal });
    },
    confirmDocFile(newVal) {
      this.setUserSignupData({ se_confirm_doc: newVal });
    },
  },
  methods: {
    ...mapActions('userSignupStore', ['setUserSignupData']),
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
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

    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
