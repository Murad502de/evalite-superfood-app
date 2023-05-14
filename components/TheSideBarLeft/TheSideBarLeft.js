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
        to: this.getRedirectRouteName(linkTop.name),
        active: this.isLinkActive(linkTop.name),
        hidden: this.isLinkHidden(linkTop.name),
      }));
    },
    linksBottom() {
      return linksBottom.map(linkBottom => ({
        ...linkBottom,
        to: this.getRedirectRouteName(linkBottom.name),
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
    onLogoClicked() {
      this.$router.push({ name: this.getRedirectRouteNameHome(this.userData.role) });
    },
    getRedirectRouteName(routeName) {
      switch (routeName) {
        case routeNames.applications:
          return routeNames.applications;
        case routeNames.profile:
          return routeNames.profile;
        case routeNames.settings:
          return routeNames.settings;
        case routeNames.exit:
          return routeNames.index;
        default:
          return this.getRedirectRouteNameHome(this.userData.role);
      }
    },
    getRedirectRouteNameHome(role) {
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
        case routeNames.profile:
          return this.userData.role !== roles.admin;
        case routeNames.home:
          return this.userData.role === roles.admin;
        default:
          return false;
      }
    },
  },
  created() { },
  mounted() { },
};
