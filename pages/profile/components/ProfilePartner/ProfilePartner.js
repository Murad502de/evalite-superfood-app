import { mapGetters, mapActions, } from 'vuex';
import * as textContent from './shared/textContent';
import PartnerProfile from '@/components/PartnerProfile/PartnerProfile.vue';
import { editPersonal } from '@/UseCases/User/Profile/Partner/EditBySelf/editPersonal';
import { editPassport } from '@/UseCases/User/Profile/Partner/EditBySelf/editPassport';

export default {
  components: {
    PartnerProfile,
  },
  props: {},
  data() {
    return {
      saveLoading: false,
    };
  },
  computed: {
    ...mapGetters('userStore', ['userData']),
    title() {
      return textContent.title;
    },
  },
  watch: {},
  methods: {
    ...mapActions('userStore', ['setUserData']),
    confirm() {
      return confirm('Применение данных настроек потребует повторной верификации');
    },
    async savePersonal(data) {
      console.debug('savePersonal/data', data); //DELETE
      this.saveLoading = true;
      await editPersonal({
        data: {
          uuid: this.userData.uuid,
          ...data,
        },
        store: this.$store,
      });
      this.saveLoading = false;
    },
    async savePassport(data) {
      console.debug('savePassport/data', data); //DELETE
      this.saveLoading = true;
      await editPassport({
        data: {
          uuid: this.userData.uuid,
          ...data,
        },
        store: this.$store,
      });
      this.saveLoading = false;
    },
    savePaymentDetails(data) {
      console.debug('savePaymentDetails/data', data); //DELETE
      this.saveLoading = true;
    },
    saveContract(data) {
      console.debug('saveContract/data', data); //DELETE
      this.confirm();
    },
    sendForVerification() {
      console.debug('sendForVerification'); //DELETE
    },
  },
  created() { },
  mounted() { },
};
