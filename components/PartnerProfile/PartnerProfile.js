import AppOverlay from '@/components/AppOverlay/AppOverlay.vue';
import PersonalCard from './components/PersonalCard/PersonalCard.vue';
import PersonalCardSettings from './components/PersonalCardSettings/PersonalCardSettings.vue';
import PassportCard from './components/PassportCard/PassportCard.vue';
import PassportCardSettings from './components/PassportCardSettings/PassportCardSettings.vue';
import PaymentDetailsCard from './components/PaymentDetailsCard/PaymentDetailsCard.vue';
import PaymentDetailsCardSettings from './components/PaymentDetailsCardSettings/PaymentDetailsCardSettings.vue';
import ContractCard from './components/ContractCard/ContractCard.vue';
import ContractCardSettings from './components/ContractCardSettings/ContractCardSettings.vue';
import * as cardNames from './shared/cardNames.js';
import { parseFromISOtoDdMmYyyy } from '@/utils/date';

export default {
  components: {
    AppOverlay,
    PersonalCard,
    PersonalCardSettings,
    PassportCard,
    PassportCardSettings,
    PaymentDetailsCard,
    PaymentDetailsCardSettings,
    ContractCard,
    ContractCardSettings,
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
      openedSettings: null,
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
      return this.user?.birthday ? parseFromISOtoDdMmYyyy(this.user.birthday) : null;
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
    cardNames() {
      return cardNames;
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

    openCardSettings(cardName) {
      console.debug('openCardSettings/cardName', cardName); //DELETE
      this.openedSettings = cardName;
      this.dialog = true;
    },
  },
  created() { },
  mounted() { },
};
