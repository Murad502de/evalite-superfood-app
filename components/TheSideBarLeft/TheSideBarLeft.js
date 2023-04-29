import Logo from '@/assets/svg/evalite-ctystal-logo.svg';
import Link from './components/Link/Link.vue';
import { linksTop, linksBottom, } from './shared/links';
import Cookies from 'js-cookie'; //FIXME

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
    linksTop() {
      return linksTop.map(linkTop => ({
        ...linkTop,
        active: this.isLinkActive(),
        hidden: this.isLinkHidden(),
      }));
    },
    linksBottom() {
      return linksBottom.map(linkBottom => ({
        ...linkBottom,
        active: this.isLinkActive(),
        hidden: this.isLinkHidden(),
      }));
    },
  },
  watch: {},
  methods: {
    onLinkClicked(link) {
      console.debug('onLinkClicked', link); //DELETE

      if (link.name === 'exit') {
        Cookies.set('token', ''); //FIXME
        this.$router.push({ name: 'signin' });
      }
    },
    isLinkActive() {
      return false;
    },
    isLinkHidden() {
      return false;
    },
  },
  created() { },
  mounted() { },
};
