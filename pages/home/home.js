import { mapGetters, mapActions, } from 'vuex';
import * as roles from "@/shared/roles";
import HomePartner from './components/HomePartner/HomePartner.vue';

export default {
  components: {
    HomePartner,
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
          return "HomePartner";
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
