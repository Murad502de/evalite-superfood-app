import * as employmentTypes from '@/shared/employmentTypes';
import AppOverlay from '@/components/AppOverlay/AppOverlay.vue';
import AppCard from '@/components/AppCard/AppCard.vue';
import AppButton from '@/components/AppButton/AppButton.vue';
import AppTextField from '@/components/AppTextField/AppTextField.vue';
import AppSelect from '@/components/AppSelect/AppSelect.vue';
import AppFormPersonalData from '@/components/AppFormPersonalData/AppFormPersonalData.vue';
import AppFormPassport from '@/components/AppFormPassport/AppFormPassport.vue';
import AppFormPaymentDetailsSE from '@/components/AppFormPaymentDetailsSE/AppFormPaymentDetailsSE.vue';
import AppFormPaymentDetailsIE from '@/components/AppFormPaymentDetailsIE/AppFormPaymentDetailsIE.vue';
import AppFormDoc from '@/components/AppFormDoc/AppFormDoc.vue';

export default {
  components: {
    AppOverlay,
    AppCard,
    AppButton,
    AppTextField,
    AppSelect,
    AppFormPersonalData,
    AppFormPassport,
    AppFormPaymentDetailsSE,
    AppFormPaymentDetailsIE,
    AppFormDoc,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    saveLoading: {
      type: Boolean,
      default: false,
    },
    approveLoading: {
      type: Boolean,
      default: false,
    },
    edited: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object | null,
      required: true,
    },
  },
  data() {
    return {
      tab: 0,
      valid: true,
    };
  },
  computed: {
    title() {
      if (this.user === null) return;
      return this.user.fullName;
    },
    employmentTypeCrt() {
      return this.user ? this.user.employmentType : null;
    },
    employmentTypeSE() {
      return employmentTypes.selfEmployed;
    },
    employmentTypeIE() {
      return employmentTypes.individualEntrepreneur;
    },
  },
  watch: {},
  methods: {
    close() {
      if (this.approveLoading || this.saveLoading) return;
      this.$emit('close');
      this.tab = 0;
    },
    save() {
      if (this.validForms(true)) {
        this.$emit('save');
      }
    },
    approve() {
      if (this.validForms()) {
        if (this.edited) {
          alert('Данные были изменены. Перед утверждением, необходимо сохранить изменения.');
          return;
        }

        this.$emit('approve');
        this.tab = 0; //FIXME
      }
    },
    validForms(save = false) {
      const personalDataForm = this.$refs.personal_data_form;
      const passportForm = this.$refs.passport_form;
      const paymentDetailsForm = this.getPaymentDetailsFormRef();
      const agencyContractForm = this.$refs.agency_contract_form;

      console.debug('personalDataForm', personalDataForm); //DELETE
      console.debug('passportForm', passportForm); //DELETE
      console.debug('paymentDetailsForm', paymentDetailsForm); //DELETE
      console.debug('agencyContractForm', agencyContractForm); //DELETE

      if (
        !personalDataForm ||
        !passportForm ||
        !paymentDetailsForm ||
        (!agencyContractForm && !save)
      ) {
        alert('Необходимо проверить всё разделы');
        return false;
      }

      if (!personalDataForm.validate()) {
        this.tab = 0;
        return false;
      }

      if (!passportForm.validate()) {
        this.tab = 1;
        return false;
      }

      if (!paymentDetailsForm.validate()) {
        this.tab = 2;
        return false;
      }

      if (!save && !agencyContractForm.validate()) {
        this.tab = 3;
        return false;
      }

      return true;
    },
    getPaymentDetailsFormRef() {
      if (this.employmentTypeCrt === this.employmentTypeSE) return this.$refs.payment_details_form_se;
      if (this.employmentTypeCrt === this.employmentTypeIE) return this.$refs.payment_details_form_ie;
      return null;
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

    updateFullNamePass(value) {
      console.debug('VerDet/updateFullNamePass', value); //DELETE
      this.$emit('update:pass_full_name', value);
    },
    updateSeriesPass(value) {
      console.debug('VerDet/updateSeriesPass', value); //DELETE
      this.$emit('update:pass_series', value);
    },
    updateNumberPass(value) {
      console.debug('VerDet/updateNumberPass', value); //DELETE
      this.$emit('update:pass_number', value);
    },
    updateIssueDatePass(value) {
      console.debug('VerDet/updateIssueDatePass', value); //DELETE
      this.$emit('update:pass_issue_date', value);
    },
    updateRegistrationAddressPass(value) {
      console.debug('VerDet/updateRegistrationAddressPass', value); //DELETE
      this.$emit('update:pass_registration_address', value);
    },
    updateIssueByPass(value) {
      console.debug('VerDet/updateIssueByPass', value); //DELETE
      this.$emit('update:pass_issue_by', value);
    },
    updateDepartmentCodePass(value) {
      console.debug('VerDet/updateDepartmentCodePass', value); //DELETE
      this.$emit('update:pass_department_code', value);
    },
    updateMainSpreadPass(value) {
      console.debug('VerDet/updateMainSpreadPass', value); //DELETE
      this.$emit('update:pass_main_spread', value);
    },
    updateRegistrationSpreadPass(value) {
      console.debug('VerDet/updateRegistrationSpreadPass', value); //DELETE
      this.$emit('update:pass_registration_spread', value);
    },
    updateVerificationSpreadPass(value) {
      console.debug('VerDet/updateVerificationSpreadPass', value); //DELETE
      this.$emit('update:pass_verification_spread', value);
    },

    updateFullNameSE(value) {
      console.debug('VerDet/updateFullNameSE', value); //DELETE
      this.$emit('update:full_name_se', value);
    },
    updateTransactionAccountSE(value) {
      console.debug('VerDet/updateTransactionAccountSE', value); //DELETE
      this.$emit('update:transaction_account_se', value);
    },
    updateInnSE(value) {
      console.debug('VerDet/updateInnSE', value); //DELETE
      this.$emit('update:inn_se', value);
    },
    updateSwiftSE(value) {
      console.debug('VerDet/updateSwiftSE', value); //DELETE
      this.$emit('update:swift_se', value);
    },
    updateMailingAddressSE(value) {
      console.debug('VerDet/updateMailingAddressSE', value); //DELETE
      this.$emit('update:mailing_address_se', value);
    },
    updateBankSE(value) {
      console.debug('VerDet/updateBankSE', value); //DELETE
      this.$emit('update:bank_se', value);
    },
    updateBicSE(value) {
      console.debug('VerDet/updateBicSE', value); //DELETE
      this.$emit('update:bic_se', value);
    },
    updateCorrespondentAccountSE(value) {
      console.debug('VerDet/updateCorrespondentAccountSE', value); //DELETE
      this.$emit('update:correspondent_account_se', value);
    },
    updateBankInnSE(value) {
      console.debug('VerDet/updateBankInnSE', value); //DELETE
      this.$emit('update:bank_inn_se', value);
    },
    updateBankKppSE(value) {
      console.debug('VerDet/updateBankKppSE', value); //DELETE
      this.$emit('update:bank_kpp_se', value);
    },
    updateConfirmDocSE(value) {
      console.debug('VerDet/updateConfirmDocSE', value); //DELETE
      this.$emit('update:confirm_doc_se', value);
    },

    updateFullNameIE(value) {
      console.debug('VerDet/updateFullNameIE/value', value); //DELETE
      this.$emit('update:full_name_ie', value);
    },
    updateOrganizationLegalAddressIE(value) {
      console.debug('VerDet/updateOrganizationLegalAddressIE/value', value); //DELETE
      this.$emit('update:organization_legal_address_ie', value);
    },
    updateInnIE(value) {
      console.debug('VerDet/updateInnIE/value', value); //DELETE
      this.$emit('update:inn_ie', value);
    },
    updateOgrnIE(value) {
      console.debug('VerDet/updateOgrnIE/value', value); //DELETE
      this.$emit('update:ogrn_ie', value);
    },
    updateTransactionAccountIE(value) {
      console.debug('VerDet/updateTransactionAccountIE/value', value); //DELETE
      this.$emit('update:transaction_account_ie', value);
    },
    updateBankIE(value) {
      console.debug('VerDet/updateBankIE/value', value); //DELETE
      this.$emit('update:bank_ie', value);
    },
    updateBankInnIE(value) {
      console.debug('VerDet/updateBankInnIE/value', value); //DELETE
      this.$emit('update:bank_inn_ie', value);
    },
    updateBankBicIE(value) {
      console.debug('VerDet/updateBankBicIE/value', value); //DELETE
      this.$emit('update:bank_bic_ie', value);
    },
    updateBankCorrespondentAccountIE(value) {
      console.debug('VerDet/updateBankCorrespondentAccountIE/value', value); //DELETE
      this.$emit('update:bank_correspondent_account_ie', value);
    },
    updateBankLegalAddressIE(value) {
      console.debug('VerDet/updateBankLegalAddressIE/value', value); //DELETE
      this.$emit('update:bank_legal_address_ie', value);
    },
    updateConfirmDocIE(value) {
      console.debug('VerDet/updateConfirmDocIE/value', value); //DELETE
      this.$emit('update:confirm_doc_ie', value);
    },

    updateAgencyContract(value) {
      console.debug('VerDet/updateAgencyContract/value', value); //DELETE
      this.$emit('update:agency_contract', value);
    },
  },
  created() { },
  mounted() { },
}
