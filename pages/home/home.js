import { mapGetters, mapActions, } from 'vuex';
import * as roles from "@/shared/roles";
import HomeReferral from './components/HomeReferral/HomeReferral.vue';

export default {
  components: {
    HomeReferral,
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters('userStore', ['userData']),
  },
  watch: {},
  methods: {
    ...mapActions('userStore', ['setUserData']),
    getComponent(name) {
      switch (name) {
        case roles.referral:
          return "HomeReferral";
        default:
          return null;
      }
    },
  },
  created() {
    if (this.userData.role === roles.admin) {
      this.$router.push('applications')
    }
  },
  mounted() { },
};
