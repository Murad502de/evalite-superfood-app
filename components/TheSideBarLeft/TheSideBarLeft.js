import { mapGetters } from 'vuex';
import Logo from '@/assets/svg/evalite-ctystal-logo.svg';
import Link from './components/Link/Link.vue';
import { linksTop, linksBottom, } from './shared/links';
import * as routeNames from '@/shared/routeNames';
import * as roles from '@/shared/roles';
import { authSignoutService } from '@/services/authSignoutService';

export default {
  components: {
    Logo,
    Link,
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters('userStore', ['userData']),
    linksTop() {
      return linksTop.map(linkTop => ({
        ...linkTop,
        to: this.getRedirectUrl(linkTop.name),
        active: this.isLinkActive(linkTop.name),
        hidden: this.isLinkHidden(linkTop.name),
      }));
    },
    linksBottom() {
      return linksBottom.map(linkBottom => ({
        ...linkBottom,
        to: this.getRedirectUrl(linkBottom.name),
        active: this.isLinkActive(linkBottom.name),
        hidden: this.isLinkHidden(linkBottom.name),
      }));
    },
  },
  watch: {},
  methods: {
    async onLinkClicked(link) {
      if (link.name === 'exit') await authSignoutService();
      this.$router.push({ name: link.to });
    },
    getRedirectUrl(routeName) {
      switch (routeName) {
        case routeNames.home:
          return this.getRedirectUrlHome(this.userData.role);
        case routeNames.profile:
          return routeNames.profile;
        case routeNames.exit:
          return routeNames.index;
        default:
          return routeNames.home;
      }
    },
    getRedirectUrlHome(role) {
      switch (role) {
        case roles.admin:
          return routeNames.applications;
        default:
          return routeNames.home;
      }
    },
    isLinkActive(routeName) {
      return routeName === this.$route.name;
    },
    isLinkHidden(routeName) {
      switch (routeName) {
        case routeNames.applications:
        case routeNames.settings:
          return this.userData.role !== roles.admin;
        default:
          return false;
      }
    },
  },
  created() { },
  mounted() { },
};
