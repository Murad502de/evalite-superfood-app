import { createUploadedFileUrl } from '@/utils/file.js';
import AppFormMediaDoc from '@/components/AppFormMediaDoc/AppFormMediaDoc.vue';

export default {
  components: {
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
      agencyContractFile: null,
      agencyContractName: null,
      agencyContractUrl: null,
      agencyContractError: false,
    };
  },
  computed: {},
  watch: {
    data(newVal) {
      console.debug('AppFormDoc/watch/data/newVal', newVal); //DELETE
      this.init(newVal);
    },
    agencyContractFile(newVal) {
      if (this.isDataNull()) return;
      console.debug('AppFormDoc/watch/agencyContractFile', newVal); //DELETE
      this.$emit('update:agency_contract', newVal);
    },
  },
  methods: {
    uploadAgencyContract(file = null) {
      if (this.loading || this.disabled) return;
      //TODO call validate service
      console.debug(file); //DELETE
      this.agencyContractFile = file;
      this.agencyContractName = file.name;
      this.agencyContractUrl = createUploadedFileUrl(file);
      this.agencyContractError = false;
    },
    deleteAgencyContract() {
      if (this.loading || this.disabled) return;
      this.agencyContractFile = null;
      this.agencyContractName = null;
      this.agencyContractUrl = null;
      this.agencyContractError = false;
    },
    init(value) {
      console.debug('AppFormDoc/methods/init/value', value); //DELETE

      if (value === null) {
        this.agencyContractFile = null;
        this.agencyContractName = null;
        this.agencyContractUrl = null;
        this.agencyContractError = false;
        return;
      }

      this.agencyContractUrl = value.agencyContract;
    },
    isDataNull() {
      console.debug('AppFormDoc/methods/isDataNull/data', this.data); //DELETE
      return this.data === null;
    },
    validate() {
      this.agencyContractError = !this.agencyContractUrl;
      return this.agencyContractUrl;
    },
  },
  created() {
    console.debug('AppFormDoc/created/data', this.data); //DELETE
    this.init(this.data);
  },
  mounted() { },
};
