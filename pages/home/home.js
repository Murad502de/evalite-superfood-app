import * as roles from "@/shared/roles";
import homeAdmin from './components/homeAdmin/homeAdmin.vue';
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
  computed: {},
  watch: {},
  methods: {
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
  created() { },
  mounted() { },
};
