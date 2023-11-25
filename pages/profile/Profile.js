import { mapGetters, mapActions, } from 'vuex';
import * as roles from "@/shared/roles";
import ProfilePartner from './components/ProfilePartner/ProfilePartner.vue';

export default {
  layout: "default",
  components: {
    ProfilePartner,
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
        case roles.partner:
          return "ProfilePartner";
        default:
          return null;
      }
    },
  },
  created() { },
  mounted() { },
};
