import AppOverlay from '@/components/AppOverlay/AppOverlay.vue';
import PersonalCard from './components/PersonalCard/PersonalCard.vue';
import BlockCard from './components/BlockCard/BlockCard.vue';
import PersonalCardSettings from './components/PersonalCardSettings/PersonalCardSettings.vue';
import PassportCardSettings from './components/PassportCardSettings/PassportCardSettings.vue';
import PaymentDetailsCardSettings from './components/PaymentDetailsCardSettings/PaymentDetailsCardSettings.vue';
import ContractCardSettings from './components/ContractCardSettings/ContractCardSettings.vue';
import * as cardNames from './shared/cardNames.js';
import { parseFromISOtoDdMmYyyy } from '@/utils/date';

export default {
  components: {
    AppOverlay,
    PersonalCard,
    BlockCard,
    PersonalCardSettings,
    PassportCardSettings,
    PaymentDetailsCardSettings,
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

    passCardFields() {
      return [
        {
          title: 'ФИО в паспорте',
          value: this.user.passport?.fullName,
        },
        {
          title: 'Серия ',
          value: this.user.passport?.series,
        },
        {
          title: 'Номер',
          value: this.user.passport?.number,
        },
        {
          title: 'Дата выдачи',
          value: this.user.passport?.issueDate,
        },
        {
          title: 'Кем выдан',
          value: this.user.passport?.issueBy,
        },
        {
          title: 'Код подразделения',
          value: this.user.passport?.departmentCode,
        },
        {
          title: 'Адрес регистрации',
          value: this.user.passport?.registrationAddress,
        },
      ];
    },
    paymentDetailsCardFields() {
      return [
        {
          title: 'ФИО ИП',
          value: this.user.paymentDetailsIndividualEntrepreneur?.fullName,
        },
        {
          title: 'Юридический адрес организации',
          value: this.user.paymentDetailsIndividualEntrepreneur?.organizationLegalAddress,
        },
        {
          title: 'ИНН',
          value: this.user.paymentDetailsIndividualEntrepreneur?.inn,
        },
        {
          title: 'ОГРН',
          value: this.user.paymentDetailsIndividualEntrepreneur?.ogrn,
        },
        {
          title: 'Расчетный счет',
          value: this.user.paymentDetailsIndividualEntrepreneur?.transactionAccount,
        },
        {
          title: 'Банк',
          value: this.user.paymentDetailsIndividualEntrepreneur?.bank,
        },
        {
          title: 'ИНН банка',
          value: this.user.paymentDetailsIndividualEntrepreneur?.bankInn,
        },
        {
          title: 'БИК банка',
          value: this.user.paymentDetailsIndividualEntrepreneur?.bankBic,
        },
        {
          title: 'Корреспондентский счет банка',
          value: this.user.paymentDetailsIndividualEntrepreneur?.bankCorrespondentAccount,
        },
        {
          title: 'Юридический адрес банка',
          value: this.user.paymentDetailsIndividualEntrepreneur?.bankLegalAddress,
        },
      ];
    },

    agencyContractLink() {
      return this.user.agencyContract;
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
