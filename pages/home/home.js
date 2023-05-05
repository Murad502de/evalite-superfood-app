import { mapGetters, mapActions, } from 'vuex';
import * as roles from "@/shared/roles";
// import homeAdmin from './components/homeAdmin/homeAdmin.vue';
import homeAdmin from '@/pages/applications/index.vue';
import homeReferral from './components/homeReferral/homeReferral.vue';

export default {
  components: {
    homeAdmin,
    homeReferral,
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
          return "homeAdmin";
        case roles.referral:
          return "homeReferral";
        default:
          return "";
      }
    },
  },
  created() {},
  mounted() { },
};
