import AppOverlay from '@/components/AppOverlay/AppOverlay.vue';
import PartnerProfileInfoCardSettings from '@/components/PartnerProfileInfoCardSettings/PartnerProfileInfoCardSettings.vue';

import PersonalCard from './components/PersonalCard/PersonalCard.vue';
import PassportCard from './components/PassportCard/PassportCard.vue';
import PaymentDetailsCard from './components/PaymentDetailsCard/PaymentDetailsCard.vue';
import ContractCard from './components/ContractCard/ContractCard.vue';

export default {
  components: {
    AppOverlay,
    PartnerProfileInfoCardSettings,
    PersonalCard,
    PassportCard,
    PaymentDetailsCard,
    ContractCard,
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
    verificationStatus() {
      return this.user?.verificationStatus;
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
    updatePassword(value) {
      this.$emit('update:password', value);
    },
  },
  created() { },
  mounted() { },
};
