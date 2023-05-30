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
      docFile: null,
      docName: null,
      docUrl: null,
      docError: false,
    };
  },
  computed: {},
  watch: {
    data(newVal) {
      console.debug('AppFormDoc/watch/data/newVal', newVal); //DELETE
      this.init(newVal);
    },
    // docFile(newVal) {
    //   if (this.isDataNull()) return;
    //   console.debug('AppFormDoc/watch/docFile', newVal); //DELETE
    //   this.$emit('update:agency_contract', newVal);
    // },
  },
  methods: {
    uploadAgencyContract(file = null) {
      if (this.loading || this.disabled) return;
      //TODO call validate service
      console.debug(file); //DELETE
      this.docFile = file;
      this.docName = file.name;
      this.docUrl = createUploadedFileUrl(file);
      this.docError = false;

      this.$emit('update:agency_contract', this.docFile);
    },
    deleteAgencyContract() {
      if (this.loading || this.disabled) return;
      this.docFile = null;
      this.docName = null;
      this.docUrl = null;
      this.docError = false;

      this.$emit('update:agency_contract', this.docFile);
    },
    init(value) {
      console.debug('AppFormDoc/methods/init/value', value); //DELETE

      if (value === null) {
        this.docFile = null;
        this.docName = null;
        this.docUrl = null;
        this.docError = false;
        return;
      }

      this.docUrl = value;
    },
    isDataNull() {
      console.debug('AppFormDoc/methods/isDataNull/data', this.data); //DELETE
      return this.data === null;
    },
    validate() {
      this.docError = !this.docUrl;
      return this.docUrl;
    },
  },
  created() {
    console.debug('AppFormDoc/created/data', this.data); //DELETE
    this.init(this.data);
  },
  mounted() { },
};
