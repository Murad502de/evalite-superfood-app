import { mapGetters, mapActions, } from 'vuex';
import * as textContent from './shared/textContent';
import PartnerProfile from '@/components/PartnerProfile/PartnerProfile.vue';
import { updateUserPersonal } from '@/services/userService';

export default {
  components: {
    PartnerProfile,
  },
  props: {},
  data() {
    return {};
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
    savePersonal(data) {
      console.debug('savePersonal/data', data); //DELETE
      updateUserPersonal({
        uuid: this.userData.uuid,
        ...data,
      });
    },
    savePassport(data) {
      console.debug('savePassport/data', data); //DELETE
      this.confirm();
    },
    savePaymentDetails(data) {
      console.debug('savePaymentDetails/data', data); //DELETE
      this.confirm();
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
