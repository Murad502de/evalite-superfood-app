import { mapGetters, mapActions, } from 'vuex';
import Home from './components/Home/Home.vue';

export default {
  components: {
    Home,
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
        return ''; //verification
      } else if (this.userData) {
        return ''; //contract
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
