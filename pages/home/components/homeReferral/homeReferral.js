import { mapGetters, mapActions, } from 'vuex';
import Home from './components/Home/Home.vue';
import Verification from './components/Verification/Verification.vue';
import AgencyContract from './components/AgencyContract/AgencyContract.vue';

export default {
  components: {
    Home,
    Verification,
    AgencyContract,
  },

  props: {},
  data: () => ({}),
  computed: {
    ...mapGetters('userStore', ['userData']),
    agencyContract() {
      return this.userData.agency_contract;
    },
    verificationStatus() {
      return this.userData.verification_status;
    },
  },

  watch: {},
  methods: {
    ...mapActions('userStore', ['setUserData']),
    getComponent() {
      if (this.userData && this.agencyContract && this.verificationStatus === 'completed') {
        return 'Home';
      } else if (this.userData && this.agencyContract) {
        return 'Verification';
      } else if (this.userData) {
        return 'AgencyContract';
      }

      return null;
    },
  },

  created() {
    console.debug('this.userData', this.userData); //DELETE
    console.debug('this.agencyContract', this.agencyContract); //DELETE
    console.debug('this.verificationStatus', this.verificationStatus); //DELETE
  },
  mounted() { },
}
