import AppBarEmpty from '@/components/AppBarEmpty';
import Start from './components/Start/Start.vue';
import Steps from './components/Steps/Steps.vue';
import Finish from './components/Finish/Finish.vue';
import * as activeSections from './shared/activeSections';

export default {
  layout: "empty",
  components: {
    AppBarEmpty,
    Start,
    Steps,
    Finish,
  },
  props: {},
  data() {
    return {
      activeSection: null,
    };
  },
  computed: {
    activeSections() {
      return activeSections;
    },
  },
  watch: {},
  methods: {
    setActiveSection(section = null) {
      this.activeSection = section;
    },
    redirectTo(to) {
      this.$router.push({ name: to });
    },
  },
  created() {
    this.setActiveSection(activeSections.start);
  },
  mounted() { },
}
