import * as icons from './shared/iconNames';
import HomeSvg from '@/assets/svg/home.svg';
import ExitSvg from '@/assets/svg/exit.svg';
import SettingsSvg from '@/assets/svg/cog_outline.svg';
import ProfileSvg from '@/assets/svg/user_outline.svg';
import Applications from '@/assets/svg/list_outline.svg';

export default {
  components: {
    HomeSvg,
    ExitSvg,
    SettingsSvg,
    ProfileSvg,
    Applications,
  },
  props: {
    iconName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    hideTitle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    getIcon(name) {
      switch (name) {
        case icons.home:
          return 'HomeSvg';
        case icons.exit:
          return 'ExitSvg';
        case icons.settings:
          return 'SettingsSvg';
        case icons.profile:
          return 'ProfileSvg';
        case icons.applications:
          return 'Applications';
        default:
          return '';
      }
    },
  },
  created() { },
  mounted() { },
};
