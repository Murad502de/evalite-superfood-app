import { usersVerifications } from '@/api/users/usersVerifications';
import { usersUuid } from '@/api/users/usersUuid';
import { usersUuidUpdate } from '@/api/users/usersUuidUpdate';
import { usersUuidStatusVerificationSet } from '@/api/users/usersUuidStatusVerificationSet';
import { userUuidInAdapter } from '@/api/adapters/users/userUuidInAdapter';
import { userUuidOutAdapter } from '@/api/adapters/users/userUuidOutAdapter';
import { parseFromISOtoDdMmYyyy } from '@/utils/date';
import { getRoleTitleByCode } from '@/utils/roles';
import { createUploadedFileUrl } from '@/utils/file.js';
import AppTable from '@/components/AppTable/AppTable.vue';
import VerificationsDetail from './components/VerificationsDetail/VerificationsDetail.vue';

export default {
  components: {
    AppTable,
    VerificationsDetail,
  },
  props: {},
  data() {
    return {
      headers: [
        {
          value: 'full_name',
          text: 'ФИО',
          align: 'start',
          sortable: false,
        },
        {
          value: 'date',
          text: 'Дата',
          sortable: false,
        },
        {
          value: 'role',
          text: 'Роль',
          sortable: false,
        },
      ],
      items: [],
      loading: false,
      page: 1,
      lastPage: 1,
      itemsPerPage: 5,
      itemsLength: 0,

      verificationsDetail: {},
      verificationsDetailEdited: false,
      verificationsDetailDialog: false,
      verificationsDetailLoading: false,
      verificationsDetailLoadingSave: false,
      verificationsDetailLoadingApprove: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    async openVerificationsDetailDialog(e) {
      console.debug('Ver/openVerificationsDetailDialog/e', e); //DELETE
      this.verificationsDetailLoading = true;
      this.verificationsDetailDialog = true;
      const usersUuidResponse = await usersUuid(e.uuid);
      console.debug('usersUuidResponse', usersUuidResponse); //DELETE

      if (usersUuidResponse.status !== 200) {
        alert('Ошибка получения пользователя'); //FIXME implement with vuetify
      }

      this.verificationsDetail = await userUuidInAdapter(usersUuidResponse.data.data);
      this.verificationsDetailLoading = false;
    },
    closeVerificationsDetailDialog() {
      console.debug('closeVerificationsDetailDialog/verificationsDetail', this.verificationsDetail); //DELETE
      this.verificationsDetailDialog = false;
      this.verificationsDetail = null;
    },
    async approveVerificationsDetail() {
      console.debug('approveVerificationsDetail/verificationsDetail', this.verificationsDetail); //DELETE

      this.verificationsDetailLoadingApprove = true;

      const usersUuidStatusVerificationSetResponse = await usersUuidStatusVerificationSet(this.verificationsDetail.uuid, 'completed');

      console.debug('usersUuidStatusVerificationSetResponse', usersUuidStatusVerificationSetResponse); //DELETE

      if (usersUuidStatusVerificationSetResponse.status !== 200) {
        alert('Ошибка утверждения пользователя'); //FIXME implement with vuetify
      }

      this.verificationsDetailLoadingApprove = false;
      this.verificationsDetailDialog = false;
      this.verificationsDetail = null;
      await this.fetchUsers();
    },
    async saveVerificationsDetail() {
      console.debug('saveVerificationsDetail/verificationsDetail', this.verificationsDetail); //DELETE
      console.debug('saveVerificationsDetail/verificationsDetail/userUuidOutAdapter', await userUuidOutAdapter(this.verificationsDetail)); //DELETE
      this.verificationsDetailLoadingSave = true;
      const usersUuidUpdateResponse = await usersUuidUpdate(
        await userUuidOutAdapter(this.verificationsDetail)
      );

      console.debug('usersUuidUpdateResponse', usersUuidUpdateResponse); //DELETE

      if (usersUuidUpdateResponse.status !== 200) {
        alert('Ошибка сохранения пользователя'); //FIXME implement with vuetify
      }

      this.verificationsDetailEdited = false;
      this.verificationsDetailLoadingSave = false;
    },
    async updatePage(e) {
      this.page = e.page;
      await this.fetchUsers();
    },
    async updateItemsPerPage(e) {
      this.page = 1;
      this.itemsPerPage = e.itemsPerPage;
      await this.fetchUsers();
    },
    async fetchUsers() {
      this.items = [];
      this.loading = true;
      const usersVerificationsResponse = await usersVerifications({ page: this.page, perPage: this.itemsPerPage });

      if (usersVerificationsResponse.status !== 200) {
        alert('Ошибка получения списка'); //FIXME implement with vuetify
      }

      this.page = usersVerificationsResponse.data.meta.current_page;
      this.lastPage = usersVerificationsResponse.data.meta.last_page;
      this.itemsPerPage = usersVerificationsResponse.data.meta.per_page;
      this.itemsLength = usersVerificationsResponse.data.meta.total;
      this.items = usersVerificationsResponse.data.data.map(item => ({
        uuid: item.uuid,
        full_name: `${item.second_name} ${item.first_name} ${item.third_name}`,
        date: parseFromISOtoDdMmYyyy(item.created_at),
        role: getRoleTitleByCode(item.role),
      }));
      this.loading = false;
    },
    updateAvatar(value) {
      console.debug('Verifications/updateAvatar/value', value); //DELETE
      this.verificationsDetail.avatarFile = value;
      this.verificationsDetailEdited = true;
    },
    updateFirstName(value) {
      console.debug('Verifications/updateFirstName/value', value); //DELETE
      this.verificationsDetail.firstName = value;
      this.verificationsDetailEdited = true;
    },
    updateSecondName(value) {
      console.debug('Verifications/updateSecondName/value', value); //DELETE
      this.verificationsDetail.secondName = value;
      this.verificationsDetailEdited = true;
    },
    updateThirdName(value) {
      console.debug('Verifications/updateThirdName/value', value); //DELETE
      this.verificationsDetail.thirdName = value;
      this.verificationsDetailEdited = true;
    },
    updateGender(value) {
      console.debug('Verifications/updateGender/value', value); //DELETE
      this.verificationsDetail.gender = value;
      this.verificationsDetailEdited = true;
    },
    updateBirthday(value) {
      console.debug('Verifications/updateBirthday/value', value); //DELETE
      this.verificationsDetail.birthday = value;
      this.verificationsDetailEdited = true;
    },
    updateEmail(value) {
      console.debug('Verifications/updateEmail/value', value); //DELETE
      this.verificationsDetail.email = value;
      this.verificationsDetailEdited = true;
    },
    updatePhone(value) {
      console.debug('Verifications/updatePhone/value', value); //DELETE
      this.verificationsDetail.phone = value;
      this.verificationsDetailEdited = true;
    },
    updateFullNamePass(value) {
      console.debug('Vers/updateFullNamePass', value); //DELETE
      this.verificationsDetail.passport.fullName = value;
      this.verificationsDetailEdited = true;
    },
    updateSeriesPass(value) {
      console.debug('Vers/updateSeriesPass', value); //DELETE
      this.verificationsDetail.passport.series = value;
      this.verificationsDetailEdited = true;
    },
    updateNumberPass(value) {
      console.debug('Vers/updateNumberPass', value); //DELETE
      this.verificationsDetail.passport.number = value;
      this.verificationsDetailEdited = true;
    },
    updateIssueDatePass(value) {
      console.debug('Vers/updateIssueDatePass', value); //DELETE
      this.verificationsDetail.passport.issueDate = value;
      this.verificationsDetailEdited = true;
    },
    updateRegistrationAddressPass(value) {
      console.debug('Vers/updateRegistrationAddressPass', value); //DELETE
      this.verificationsDetail.passport.registrationAddress = value;
      this.verificationsDetailEdited = true;
    },
    updateIssueByPass(value) {
      console.debug('Vers/updateIssueByPass', value); //DELETE
      this.verificationsDetail.passport.issueBy = value;
      this.verificationsDetailEdited = true;
    },
    updateDepartmentCodePass(value) {
      console.debug('Vers/updateDepartmentCodePass', value); //DELETE
      this.verificationsDetail.passport.departmentCode = value;
      this.verificationsDetailEdited = true;
    },
    updateMainSpreadPass(value) {
      console.debug('Vers/updateMainSpreadPass', value); //DELETE
      this.verificationsDetail.passport.mainSpreadFile = value;
      this.verificationsDetail.passport.mainSpread = createUploadedFileUrl(value);
      this.verificationsDetailEdited = true;

      //createUploadedFileUrl(file);
    },
    updateRegistrationSpreadPass(value) {
      console.debug('Vers/updateRegistrationSpreadPass', value); //DELETE
      this.verificationsDetail.passport.registrationSpreadFile = value;
      this.verificationsDetail.passport.registrationSpread = createUploadedFileUrl(value);
      this.verificationsDetailEdited = true;
    },
    updateVerificationSpreadPass(value) {
      console.debug('Vers/updateVerificationSpreadPass', value); //DELETE
      this.verificationsDetail.passport.verificationSpreadFile = value;
      this.verificationsDetail.passport.verificationSpread = createUploadedFileUrl(value);
      this.verificationsDetailEdited = true;
    },
    updateFullNameSe(value) {
      console.debug('Vers/updateFullNameSe', value); //DELETE
      this.verificationsDetail.paymentDetailsSelfEmployed.fullName = value;
      this.verificationsDetailEdited = true;
    },
    updateTransactionAccountSe(value) {
      console.debug('Vers/updateTransactionAccountSe', value); //DELETE
      this.verificationsDetail.paymentDetailsSelfEmployed.transactionAccount = value;
      this.verificationsDetailEdited = true;
    },
    updateInnSe(value) {
      console.debug('Vers/updateInnSe', value); //DELETE
      this.verificationsDetail.paymentDetailsSelfEmployed.inn = value;
      this.verificationsDetailEdited = true;
    },
    updateSwiftSe(value) {
      console.debug('Vers/updateSwiftSe', value); //DELETE
      this.verificationsDetail.paymentDetailsSelfEmployed.swift = value;
      this.verificationsDetailEdited = true;
    },
    updateMailingAddressSe(value) {
      console.debug('Vers/updateMailingAddressSe', value); //DELETE
      this.verificationsDetail.paymentDetailsSelfEmployed.mailingAddress = value;
      this.verificationsDetailEdited = true;
    },
    updateBankSe(value) {
      console.debug('Vers/updateBankSe', value); //DELETE
      this.verificationsDetail.paymentDetailsSelfEmployed.bank = value;
      this.verificationsDetailEdited = true;
    },
    updateBicSe(value) {
      console.debug('Vers/updateBicSe', value); //DELETE
      this.verificationsDetail.paymentDetailsSelfEmployed.bic = value;
      this.verificationsDetailEdited = true;
    },
    updateCorrespondentAccountSe(value) {
      console.debug('Vers/updateCorrespondentAccountSe', value); //DELETE
      this.verificationsDetail.paymentDetailsSelfEmployed.correspondentAccount = value;
      this.verificationsDetailEdited = true;
    },
    updateBankInnSe(value) {
      console.debug('Vers/updateBankInnSe', value); //DELETE
      this.verificationsDetail.paymentDetailsSelfEmployed.bankInn = value;
      this.verificationsDetailEdited = true;
    },
    updateBankKppSe(value) {
      console.debug('Vers/updateBankKppSe', value); //DELETE
      this.verificationsDetail.paymentDetailsSelfEmployed.bankKpp = value;
      this.verificationsDetailEdited = true;
    },
    updateConfirmDocSe(value) {
      console.debug('Vers/updateConfirmDocSe', value); //DELETE
      this.verificationsDetail.paymentDetailsSelfEmployed.confirmDocFile = value;
      this.verificationsDetail.paymentDetailsSelfEmployed.confirmDoc = createUploadedFileUrl(value);
      this.verificationsDetailEdited = true;
    },
    updateFullNameIE(value) {
      console.debug('Vers/updateFullNameIE/value', value); //DELETE
      this.verificationsDetail.paymentDetailsIndividualEntrepreneur.fullName = value;
      this.verificationsDetailEdited = true;
    },
    updateOrganizationLegalAddressIE(value) {
      console.debug('Vers/updateOrganizationLegalAddressIE/value', value); //DELETE
      this.verificationsDetail.paymentDetailsIndividualEntrepreneur.organizationLegalAddress = value;
      this.verificationsDetailEdited = true;
    },
    updateInnIE(value) {
      console.debug('Vers/updateInnIE/value', value); //DELETE
      this.verificationsDetail.paymentDetailsIndividualEntrepreneur.inn = value;
      this.verificationsDetailEdited = true;
    },
    updateOgrnIE(value) {
      console.debug('Vers/updateOgrnIE/value', value); //DELETE
      this.verificationsDetail.paymentDetailsIndividualEntrepreneur.ogrn = value;
      this.verificationsDetailEdited = true;
    },
    updateTransactionAccountIE(value) {
      console.debug('Vers/updateTransactionAccountIE/value', value); //DELETE
      this.verificationsDetail.paymentDetailsIndividualEntrepreneur.transactionAccount = value;
      this.verificationsDetailEdited = true;
    },
    updateBankIE(value) {
      console.debug('Vers/updateBankIE/value', value); //DELETE
      this.verificationsDetail.paymentDetailsIndividualEntrepreneur.bank = value;
      this.verificationsDetailEdited = true;
    },
    updateBankInnIE(value) {
      console.debug('Vers/updateBankInnIE/value', value); //DELETE
      this.verificationsDetail.paymentDetailsIndividualEntrepreneur.bankInn = value;
      this.verificationsDetailEdited = true;
    },
    updateBankBicIE(value) {
      console.debug('Vers/updateBankBicIE/value', value); //DELETE
      this.verificationsDetail.paymentDetailsIndividualEntrepreneur.bankBic = value;
      this.verificationsDetailEdited = true;
    },
    updateBankCorrespondentAccountIE(value) {
      console.debug('Vers/updateBankCorrespondentAccountIE/value', value); //DELETE
      this.verificationsDetail.paymentDetailsIndividualEntrepreneur.bankCorrespondentAccount = value;
      this.verificationsDetailEdited = true;
    },
    updateBankLegalAddressIE(value) {
      console.debug('Vers/updateBankLegalAddressIE/value', value); //DELETE
      this.verificationsDetail.paymentDetailsIndividualEntrepreneur.bankLegalAddress = value;
      this.verificationsDetailEdited = true;
    },
    updateConfirmDocIE(value) {
      console.debug('Vers/updateConfirmDocIE/value', value); //DELETE
      this.verificationsDetail.paymentDetailsIndividualEntrepreneur.confirmDocFile = value;
      this.verificationsDetail.paymentDetailsIndividualEntrepreneur.confirmDoc = createUploadedFileUrl(value);
      this.verificationsDetailEdited = true;
    },
    updateAgencyContract(value) {
      console.debug('Vers/updateAgencyContract/value', value); //DELETE
      this.verificationsDetail.agencyContractFile = value;
      this.verificationsDetail.agencyContract = createUploadedFileUrl(value);
      this.verificationsDetailEdited = true;
    },
  },
  async created() {
    await this.fetchUsers();
  },
  mounted() { },
}
