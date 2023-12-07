import { mapGetters, mapActions, } from 'vuex';
import * as textContent from './shared/textContent';
import PartnerProfile from '@/components/PartnerProfile/PartnerProfile.vue';

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
    savePersonal(data) {
      console.debug('savePersonal/data', data); //DELETE
    },
    savePassport(data) {
      console.debug('savePassport/data', data); //DELETE
    },
    savePaymentDetails(data) {
      console.debug('savePaymentDetails/data', data); //DELETE
    },
    saveContract(data) {
      console.debug('saveContract/data', data); //DELETE
    },
  },
  created() { },
  mounted() { },
};
