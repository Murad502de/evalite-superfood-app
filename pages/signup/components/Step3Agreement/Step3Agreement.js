import EarthLogo from '@/assets/svg/earth.svg';
import InfoBlock from './components/InfoBlock';
import * as content from './shared/content';

export default {
  components: {
    EarthLogo,
    InfoBlock,
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    title() {
      return content.title;
    },
    info() {
      return content.info;
    },
    infoBlocks() {
      return content.infoBlocks;
    },
  },
  watch: {},
  methods: {},
  created() { },
  mounted() { },
}
