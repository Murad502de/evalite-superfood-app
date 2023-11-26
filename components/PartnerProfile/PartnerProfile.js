import AppCard from '@/components/AppCard/AppCard.vue';
import AppOverlay from '@/components/AppOverlay/AppOverlay.vue';
import PartnerProfileInfoCard from '@/components/PartnerProfileInfoCard/PartnerProfileInfoCard.vue';

export default {
  components: {
    AppCard,
    AppOverlay,
    PartnerProfileInfoCard,
  },
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      dialog: false,
      saveLoading: false,
    };
  },
  computed: {
    avatar() {
      return this.user?.avatar;
    },
    name() {
      return `${this.user?.second_name} ${this.user?.first_name} ${this.user?.third_name}`;
    },
    inviteCode() {
      return this.user?.invite_code;
    },
    birthday() {
      return this.user?.birthday;
    },
    email() {
      return this.user?.email;
    },
    phone() {
      return this.user?.phone;
    },
  },
  watch: {},
  methods: {
    close() {
      this.dialog = false;
    },
    save() {
      this.dialog = false
    },
  },
  created() { },
  mounted() { },
};
