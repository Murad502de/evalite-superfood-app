import { mapGetters } from 'vuex';
import { usersUuidDocsAgencyContractGet } from '@/api/users/usersUuidDocsAgencyContractGet';
import { usersUuidDocsAgencyContractAdd } from '@/api/users/usersUuidDocsAgencyContractAdd';
import AppFormDoc from '@/components/AppFormDoc/AppFormDoc.vue';

export default {
  components: {
    AppFormDoc,
  },
  props: {},
  data() {
    return {
      url: null,
      disabled: false,
    };
  },
  computed: {
    ...mapGetters('userStore', ['userData']),
  },
  watch: {},
  methods: {
    async updateAgencyContract(value) {
      if (!value) return;
      console.debug('AgencyContract/updateAgencyContract/value', value); //DELETE
      this.disabled = true;
      const usersUuidDocsAgencyContractAddResponse = await usersUuidDocsAgencyContractAdd(this.userData.uuid, value);
      console.debug('AgencyContract/updateAgencyContract/usersUuidDocsAgencyContractAddResponse', usersUuidDocsAgencyContractAddResponse); //DELETE

      if (usersUuidDocsAgencyContractAddResponse.status !== 200) {
        alert('Ошибка отправки договора'); //FIXME implement with vuetify
      }

      this.disabled = false;
      this.$emit('forceRerender');
    },
  },
  async created() {
    const usersUuidDocsAgencyContractGetResponse = await usersUuidDocsAgencyContractGet(this.userData.uuid);
    this.url = window.URL.createObjectURL(new Blob([usersUuidDocsAgencyContractGetResponse.data]));
  },
  mounted() { },
}
