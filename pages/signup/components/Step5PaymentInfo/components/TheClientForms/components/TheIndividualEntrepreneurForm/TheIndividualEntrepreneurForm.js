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
      ieFullName: null,
      ieFullNameRules: [],
      organizationLegalAddress: null,
      organizationLegalAddressRules: [],
      inn: null,
      innRules: [],
      ogrn: null,
      ogrnRules: [],
      transactionAccount: null,
      transactionAccountRules: [],
      bank: null,
      bankRules: [],
      bankInn: null,
      bankInnRules: [],
      bankBic: null,
      bankBicRules: [],
      bankCorrespondentAccount: null,
      bankCorrespondentAccountRules: [],
      bankLegalAddress: null,
      bankLegalAddressRules: [],
      confirmDocFile: '',
      confirmDocName: '',
      confirmDocUrl: '',
    };
  },
  computed: {},

  watch: {},
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
