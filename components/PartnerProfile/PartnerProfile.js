import AppOverlay from '@/components/AppOverlay/AppOverlay.vue';
import PersonalCard from './components/PersonalCard/PersonalCard.vue';
import BlockCard from './components/BlockCard/BlockCard.vue';
import PersonalCardSettings from './components/PersonalCardSettings/PersonalCardSettings.vue';
import PassportCardSettings from './components/PassportCardSettings/PassportCardSettings.vue';
import PaymentDetailsCardSettings from './components/PaymentDetailsCardSettings/PaymentDetailsCardSettings.vue';
import ContractCardSettings from './components/ContractCardSettings/ContractCardSettings.vue';
import * as cardNames from './shared/cardNames.js';
import { createUploadedFileUrl } from '@/utils/file.js';

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
      secondName: null,
      firstName: null,
      thirdName: null,
      gender: null,
      birthday: null,
      email: null,
      phone: null,
      avatarFile: null,
      avatarUrl: null,
      password: null,

      passportFullName: null,
      passportSeries: null,
      passportNumber: null,
      passportIssueDate: null,
      passportIssueBy: null,
      passportDepartmentCode: null,
      passportRegistrationAddress: null,
    };
  },
  computed: {
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
          title: 'Серия',
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
      this.openedSettings = null;
    },
    savePersonal() {
      console.debug('savePersonal'); //DELETE
    },
    savePassport() {
      console.debug('savePassport'); //DELETE
    },
    savePaymentDetails() {
      console.debug('savePaymentDetails'); //DELETE
    },
    saveContract() {
      console.debug('saveContract'); //DELETE
    },
    save() {
      console.debug('save/openedSettings', this.openedSettings); //DELETE

      switch (this.openedSettings) {
        case cardNames.personalCard:
          this.savePersonal();
          break;
        case cardNames.passportCard:
          this.savePassport();
          break;
        case cardNames.paymentDetailsCard:
          this.savePaymentDetails();
          break;
        case cardNames.contractCard:
          this.saveContract();
          break;
        default:
          break;
      }

      this.dialog = false
      // const data = this.getDataToUpdate();
      // console.debug(data); //DELETE

      // //TODO validate
      // this.$emit('update:personal', data);
    },
    getDataToUpdate() {
      let data = {};
      if (this.secondName) data.secondName = this.secondName;
      if (this.firstName) data.firstName = this.firstName;
      if (this.thirdName) data.thirdName = this.thirdName;
      if (this.gender) data.gender = this.gender;
      if (this.birthday) data.birthday = this.birthday;
      if (this.email) data.email = this.email;
      if (this.phone) data.phone = this.phone;
      if (this.avatarFile) data.avatarFile = this.avatarFile;
      if (this.password) data.password = this.password;
      return data;
    },

    updateAvatar(value) {
      this.avatarFile = value;
      this.avatarUrl = createUploadedFileUrl(value);
    },
    updateSecondName(value) {
      this.secondName = value;
    },
    updateFirstName(value) {
      this.firstName = value;
    },
    updateThirdName(value) {
      this.thirdName = value;
    },
    updateGender(value) {
      this.gender = value
    },
    updateBirthday(value) {
      this.birthday = value;
    },
    updateEmail(value) {
      this.email = value;
    },
    updatePhone(value) {
      this.phone = value;
    },
    updatePassword(value) {
      this.password = value;
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
