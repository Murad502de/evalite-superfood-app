import { mapGetters, mapActions, } from 'vuex';
import { usersMy } from '@/api/users/usersMy';
import * as httpResponse from '@/shared/httpResponses';
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
  data() {
    return {
      key: 0,
    };
  },
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
      // if (this.userData && this.agencyContract && this.verificationStatus === 'completed') {
      //   return 'Home';
      // } else if (this.userData && this.agencyContract) {
      //   return 'Verification';
      // } else if (this.userData) {
      //   return 'AgencyContract';
      // }

      return 'Home';
    },
    async forceRerender() {
      console.debug('HomeReferral/methods/forceRerender'); //DELETE
      const usersMyResponse = await usersMy();
      console.debug('HomeReferral/forceRerender/usersMyResponse', usersMyResponse); //DELETE

      if (usersMyResponse.status !== httpResponse.HTTP_OK) {
        alert('Ошибка получения модели пользователя'); //FIXME implement with vuetify
      }

      this.setUserData(usersMyResponse.data.data)
      this.key++;
    },
  },

  created() {
    console.debug('this.userData', this.userData); //DELETE
    console.debug('this.agencyContract', this.agencyContract); //DELETE
    console.debug('this.verificationStatus', this.verificationStatus); //DELETE
  },
  mounted() { },
}
