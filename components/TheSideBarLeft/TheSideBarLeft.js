import { mapGetters } from 'vuex';
import Logo from '@/assets/svg/evalite-ctystal-logo.svg';
// import Logo from '@/assets/png/logo.png';
import AppSideBarLink from '@/components/AppSideBarLink/AppSideBarLink.vue';
import { linksTop, linksBottom, } from './shared/links';
import * as sidebarService from '@/services/sidebarService';

export default {
  components: {
    Logo,
    AppSideBarLink,
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
        to: sidebarService.getRedirectRouteName(linkTop.name, this.userData.role),
        active: sidebarService.isLinkActive(linkTop.name, this.$route),
        hidden: sidebarService.isLinkHidden(linkTop.name, this.userData.role),
      }));
    },
    linksBottom() {
      return linksBottom.map(linkBottom => ({
        ...linkBottom,
        to: sidebarService.getRedirectRouteName(linkBottom.name, this.userData.role),
        active: sidebarService.isLinkActive(linkBottom.name, this.$route),
        hidden: sidebarService.isLinkHidden(linkBottom.name, this.userData.role),
      }));
    },
  },
  watch: {},
  methods: {
    async onLinkClicked(link) {
      await sidebarService.onSidebarLinkClicked(link, this.$router);
    },
    onLogoClicked() {
      this.$router.push({ name: sidebarService.getRedirectRouteNameHome(this.userData.role) });
    },

  },
  created() { },
  mounted() { },
};
