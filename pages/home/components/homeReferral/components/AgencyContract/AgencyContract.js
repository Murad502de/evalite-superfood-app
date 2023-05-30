import { mapGetters } from 'vuex';
import { usersUuidDocsAgencyContractGet } from '@/api/users/usersUuidDocsAgencyContractGet';
import AppFormDoc from '@/components/AppFormDoc/AppFormDoc.vue';

export default {
  components: {
    AppFormDoc,
  },
  props: {},
  data() {
    return {
      url: null,
    };
  },
  computed: {
    ...mapGetters('userStore', ['userData']),
  },
  watch: {},
  methods: {},
  async created() {
    const usersUuidDocsAgencyContractGetResponse = await usersUuidDocsAgencyContractGet(this.userData.uuid);
    this.url = window.URL.createObjectURL(new Blob([usersUuidDocsAgencyContractGetResponse.data]));
  },
  mounted() { },
}
