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
      ],
      ogrn: '',
      ogrnRules: [
        validation.required(),
      ],
      transactionAccount: '',
      transactionAccountRules: [
        validation.required(),
      ],
      bank: '',
      bankRules: [
        validation.required(),
      ],
      bankInn: '',
      bankInnRules: [
        validation.required(),
      ],
      bankBic: '',
      bankBicRules: [
        validation.required(),
      ],
      bankCorrespondentAccount: '',
      bankCorrespondentAccountRules: [
        validation.required(),
      ],
      bankLegalAddress: '',
      bankLegalAddressRules: [
        validation.required(),
      ],
      confirmDocFile: null,
      confirmDocName: '',
      confirmDocUrl: '',
    };
  },
  computed: {
    ...mapGetters('userSignupStore', ['userSignupData']), //DELETE
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
      this.setUserSignupData({ ie_full_name: newVal });
    },
    organizationLegalAddress(newVal) {
      this.setUserSignupData({ ie_organization_legal_address: newVal });
    },
    inn(newVal) {
      this.setUserSignupData({ ie_inn: newVal });
    },
    ogrn(newVal) {
      this.setUserSignupData({ ie_ogrn: newVal });
    },
    transactionAccount(newVal) {
      this.setUserSignupData({ ie_transaction_account: newVal });
    },
    bank(newVal) {
      this.setUserSignupData({ ie_bank: newVal });
    },
    bankInn(newVal) {
      this.setUserSignupData({ ie_bank_inn: newVal });
    },
    bankBic(newVal) {
      this.setUserSignupData({ ie_bank_bic: newVal });
    },
    bankCorrespondentAccount(newVal) {
      this.setUserSignupData({ ie_bank_correspondent_account: newVal });
    },
    bankLegalAddress(newVal) {
      this.setUserSignupData({ ie_bank_legal_address: newVal });
    },
    confirmDocFile(newVal) {
      this.setUserSignupData({ ie_confirm_doc: newVal });
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
