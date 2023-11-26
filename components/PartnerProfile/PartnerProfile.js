import AppCard from '@/components/AppCard/AppCard.vue';
import AppOverlay from '@/components/AppOverlay/AppOverlay.vue';
import PartnerProfileInfoCard from '@/components/PartnerProfileInfoCard/PartnerProfileInfoCard.vue';
import PartnerProfileInfoCardSettings from '@/components/PartnerProfileInfoCardSettings/PartnerProfileInfoCardSettings.vue';

export default {
  components: {
    AppCard,
    AppOverlay,
    PartnerProfileInfoCard,
    PartnerProfileInfoCardSettings,
  },
  props: {
    user: {
      type: Object,
      required: true,
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
      return `${this.user?.secondName} ${this.user?.firstName} ${this.user?.thirdName}`;
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

    updateAvatar(value) {
      this.$emit('update:avatar', value);
    },
    updateSecondName(value) {
      this.$emit('update:second_name', value);
    },
    updateFirstName(value) {
      this.$emit('update:first_name', value);
    },
    updateThirdName(value) {
      this.$emit('update:third_name', value);
    },
    updateGender(value) {
      this.$emit('update:gender', value);
    },
    updateBirthday(value) {
      this.$emit('update:birthday', value);
    },
    updateEmail(value) {
      this.$emit('update:email', value);
    },
    updatePhone(value) {
      this.$emit('update:phone', value);
    },
  },
  created() { },
  mounted() { },
};
