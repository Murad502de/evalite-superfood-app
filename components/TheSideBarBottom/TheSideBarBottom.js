import { mapGetters } from 'vuex';
import { links } from '@/shared/sidebarLinks';
import AppSideBarLink from '@/components/AppSideBarLink/AppSideBarLink.vue';
import * as sidebarService from '@/services/sidebarService';

export default {
  components: {
    AppSideBarLink,
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters('userStore', ['userData']),
    links() {
      return links.map(link => ({
        ...link,
        to: sidebarService.getRedirectRouteName(link.name, this.userData.role),
        active: sidebarService.isLinkActive(link.name, this.$route),
        hidden: sidebarService.isLinkHidden(link.name, this.userData.role),
      }));
    },
  },
  watch: {},
  methods: {
    async onLinkClicked(link) {
      await sidebarService.onSidebarLinkClicked(link, this.$router);
    },
  },
  created() { },
  mounted() { },
}
