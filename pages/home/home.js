import { mapGetters, mapActions, } from 'vuex';
import * as roles from "@/shared/roles";
// import HomeAdmin from './components/HomeAdmin/HomeAdmin.vue';
import HomeAdmin from '@/pages/applications/index.vue';
import HomeReferral from './components/HomeReferral/HomeReferral.vue';

export default {
  components: {
    HomeAdmin,
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
        case roles.admin:
          return "HomeAdmin";
        case roles.referral:
          return "HomeReferral";
        default:
          return "";
      }
    },
  },
  created() {},
  mounted() { },
};
