import AppButton from '@/components/AppButton/AppButton.vue';
import AppOverlay from '@/components/AppOverlay/AppOverlay.vue';
import PersonalCard from './components/PersonalCard/PersonalCard.vue';
import BlockCard from './components/BlockCard/BlockCard.vue';
import PersonalCardSettings from './components/PersonalCardSettings/PersonalCardSettings.vue';
import PassportCardSettings from './components/PassportCardSettings/PassportCardSettings.vue';
import PaymentDetailsCardSettings from './components/PaymentDetailsCardSettings/PaymentDetailsCardSettings.vue';
import ContractCardSettings from './components/ContractCardSettings/ContractCardSettings.vue';
import * as cardNames from './shared/cardNames.js';
import { createUploadedFileUrl } from '@/utils/file.js';
import { usersUuidDocsAgencyContractGet } from '@/api/users/usersUuidDocsAgencyContractGet';

export default {
  components: {
    AppButton,
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

      paymentDetailsFullName: null,
      paymentDetailsOrganizationLegalAddress: null,
      paymentDetailsInn: null,
      paymentDetailsOgrn: null,
      paymentDetailsTransactionAccount: null,
      paymentDetailsBank: null,
      paymentDetailsBankInn: null,
      paymentDetailsBankBic: null,
      paymentDetailsBankCorrespondentAccount: null,
      paymentDetailsBankLegalAddress: null,
      paymentDetailConfirmDocsFile: null,

      agencyContractFile: null,
      newAgencyContractLink: null,
      newAgencyContractLoading: false,
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
      this.openedSettings = cardName;
      this.dialog = true;
    },
    close() {
      this.closeForce();
    },
    closeForce() {
      this.dialog = false;
      this.openedSettings = null;
    },
    validatePersonal() {
      let valid = this.$refs.partner_profile_personal_card_settings.validate();
      return valid;
    },
    savePersonal() {
      if (!this.validatePersonal()) return false;
      const data = this.getDataToUpdatePersonal();
      this.$emit('save:personal', data);
      return true;
    },
    validatePassport() {
      let valid = this.$refs.partner_profile_passport_card_settings.validate();
      return valid;
    },
    savePassport() {
      if (!this.validatePassport()) return false;
      const data = this.getDataToUpdatePassport();
      this.$emit('save:passport', data);
      return true;
    },
    validatePaymentDetails() {
      let valid = this.$refs.partner_profile_payment_details_card_settings.validate();
      return valid;
    },
    savePaymentDetails() {
      if (!this.validatePaymentDetails()) return false;
      const data = this.getDataToUpdatePaymentDetails();
      this.$emit('save:paymentDetails', data);
      return true;
    },
    saveContract() {
      const data = this.getDataToUpdateContract();
      this.$emit('save:contract', data);
    },
    save() {
      let valid = true;

      switch (this.openedSettings) {
        case cardNames.personalCard:
          valid = this.savePersonal();
          break;
        case cardNames.passportCard:
          valid = this.savePassport();
          break;
        case cardNames.paymentDetailsCard:
          valid = this.savePaymentDetails();
          break;
        case cardNames.contractCard:
          valid = this.saveContract();
          break;
        default:
          break;
      }

      if (valid) this.closeForce();
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
      if (this.paymentDetailsFullName) data.paymentDetailsFullName = this.paymentDetailsFullName;
      if (this.paymentDetailsOrganizationLegalAddress) data.paymentDetailsOrganizationLegalAddress = this.paymentDetailsOrganizationLegalAddress;
      if (this.paymentDetailsInn) data.paymentDetailsInn = this.paymentDetailsInn;
      if (this.paymentDetailsOgrn) data.paymentDetailsOgrn = this.paymentDetailsOgrn;
      if (this.paymentDetailsTransactionAccount) data.paymentDetailsTransactionAccount = this.paymentDetailsTransactionAccount;
      if (this.paymentDetailsBank) data.paymentDetailsBank = this.paymentDetailsBank;
      if (this.paymentDetailsBankInn) data.paymentDetailsBankInn = this.paymentDetailsBankInn;
      if (this.paymentDetailsBankBic) data.paymentDetailsBankBic = this.paymentDetailsBankBic;
      if (this.paymentDetailsBankCorrespondentAccount) data.paymentDetailsBankCorrespondentAccount = this.paymentDetailsBankCorrespondentAccount;
      if (this.paymentDetailsBankLegalAddress) data.paymentDetailsBankLegalAddress = this.paymentDetailsBankLegalAddress;
      if (this.paymentDetailConfirmDocsFile) data.paymentDetailConfirmDocsFile = this.paymentDetailConfirmDocsFile;
      return data;
    },
    getDataToUpdateContract() {
      let data = {};
      if (this.agencyContractFile) data.agencyContractFile = this.agencyContractFile;
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
    updatePaymentDetailsFullName(value) {
      this.paymentDetailsFullName = value;
    },
    updatePaymentDetailsOrganizationLegalAddress(value) {
      this.paymentDetailsOrganizationLegalAddress = value;
    },
    updatePaymentDetailsInn(value) {
      this.paymentDetailsInn = value;
    },
    updatePaymentDetailsOgrn(value) {
      this.paymentDetailsOgrn = value;
    },
    updatePaymentDetailsTransactionAccount(value) {
      this.paymentDetailsTransactionAccount = value;
    },
    updatePaymentDetailsBank(value) {
      this.paymentDetailsBank = value;
    },
    updatePaymentDetailsBankInn(value) {
      this.paymentDetailsBankInn = value;
    },
    updatePaymentDetailsBankBic(value) {
      this.paymentDetailsBankBic = value;
    },
    updatePaymentDetailsBankCorrespondentAccount(value) {
      this.paymentDetailsBankCorrespondentAccount = value;
    },
    updatePaymentDetailsBankLegalAddress(value) {
      this.paymentDetailsBankLegalAddress = value;
    },
    updatePaymentDetailConfirmDocs(value) {
      this.paymentDetailConfirmDocsFile = value;
    },
    updateAgencyContract(value) {
      this.agencyContractFile = value;
    },
    async getAgencyContractTemplate() {
      this.newAgencyContractLoading = true;

      if (this.user?.uuid && !this.agencyContractLink) {
        const usersUuidDocsAgencyContractGetResponse = await usersUuidDocsAgencyContractGet(this.user.uuid);
        this.newAgencyContractLink = createUploadedFileUrl(new Blob([usersUuidDocsAgencyContractGetResponse.data]));
      }

      setTimeout(() => {
        this.$refs.partner_contract_template_download_link.click();
        this.newAgencyContractLoading = false;
      }, 500);
    },
  },
  created() { },
  mounted() { },
};
