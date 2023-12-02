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
      passportMainSpread: null,
      passportRegistrationSpread: null,
      passportVerificationSpread: null,
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
    openCardSettings(cardName) {
      console.debug('openCardSettings/cardName', cardName); //DELETE
      this.openedSettings = cardName;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.openedSettings = null;
    },
    savePersonal() {
      console.debug('savePersonal'); //DELETE
      const data = this.getDataToUpdatePersonal();
      console.debug('savePersonal/data', data); //DELETE
      // this.$emit('update:personal', data);
    },
    savePassport() {
      console.debug('savePassport'); //DELETE
      const data = this.getDataToUpdatePassport();
      console.debug('savePassport/data', data); //DELETE
      // this.$emit('update:passport', data);
    },
    savePaymentDetails() {
      console.debug('savePaymentDetails'); //DELETE
      const data = this.getDataToUpdatePaymentDetails();
      console.debug('savePaymentDetails/data', data); //DELETE
      // this.$emit('update:paymentDetails', data);
    },
    saveContract() {
      console.debug('saveContract'); //DELETE
      const data = this.getDataToUpdateContract();
      console.debug('saveContract/data', data); //DELETE
      // this.$emit('update:paymentDetails', data);
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
      this.openedSettings = null;
    },
    getDataToUpdatePersonal() {
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
    getDataToUpdatePassport() {
      let data = {};
      if (this.passportFullName) data.passportFullName = this.passportFullName;
      if (this.passportSeries) data.passportSeries = this.passportSeries;
      if (this.passportNumber) data.passportNumber = this.passportNumber;
      if (this.passportIssueDate) data.passportIssueDate = this.passportIssueDate;
      if (this.passportIssueBy) data.passportIssueBy = this.passportIssueBy;
      if (this.passportDepartmentCode) data.passportDepartmentCode = this.passportDepartmentCode;
      if (this.passportRegistrationAddress) data.passportRegistrationAddress = this.passportRegistrationAddress;
      if (this.passportMainSpread) data.passportMainSpread = this.passportMainSpread;
      if (this.passportRegistrationSpread) data.passportRegistrationSpread = this.passportRegistrationSpread;
      if (this.passportVerificationSpread) data.passportVerificationSpread = this.passportVerificationSpread;
      return data;
    },
    getDataToUpdatePaymentDetails() {
      let data = {};
      // if (this.passportFullName) data.passportFullName = this.passportFullName;
      return data;
    },
    getDataToUpdateContract() {
      let data = {};
      // if (this.passportFullName) data.passportFullName = this.passportFullName;
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

    updatePassFullName(value) {
      this.passportFullName = value;
    },
    updatePassSeries(value) {
      this.passportSeries = value;
    },
    updatePassNumber(value) {
      this.passportNumber = value;
    },
    updatePassIssueDate(value) {
      this.passportIssueDate = value;
    },
    updatePassIssueBy(value) {
      this.passportIssueBy = value;
    },
    updatePassDepartmentCode(value) {
      this.passportDepartmentCode = value;
    },
    updatePassRegistrationAddress(value) {
      this.passportRegistrationAddress = value;
    },
    updatePassMainSpread(value) {
      this.passportMainSpread = value;
    },
    updatePassRegistrationSpread(value) {
      this.passportRegistrationSpread = value;
    },
    updatePassVerificationSpread(value) {
      this.passportVerificationSpread = value;
    },
  },
  created() { },
  mounted() { },
};
