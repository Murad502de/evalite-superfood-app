import { mapGetters, mapActions, } from 'vuex';
import * as textContent from './shared/textContent';
import PartnerProfile from '@/components/PartnerProfile/PartnerProfile.vue';
import { editPersonal } from '@/UseCases/User/Profile/Partner/EditBySelf/editPersonal';
import { editPassport } from '@/UseCases/User/Profile/Partner/EditBySelf/editPassport';
import { editPaymentDetails } from '@/UseCases/User/Profile/Partner/EditBySelf/editPaymentDetails';
import { editContract } from '@/UseCases/User/Profile/Partner/EditBySelf/editContract';
import { submitForVerification } from '@/UseCases/User/Profile/Partner/EditBySelf/submitForVerification';

export default {
  components: {
    PartnerProfile,
  },
  props: {},
  data() {
    return {
      saveLoading: false,
      submitLoading: false,
    };
  },
  computed: {
    ...mapGetters('userStore', ['userData']),
    title() {
      return textContent.title;
    },
    partnerProfileDisabled() {
      return this.userData.verificationStatus === 'waiting';
    },
    hideProfileSubmitBtn() {
      return this.userData.verificationStatus === 'waiting' ||
        this.userData.verificationStatus === 'verified' ||
        !this.userData.passport ||
        !this.userData.paymentDetailsIndividualEntrepreneur ||
        !this.userData.agencyContract;
    },
  },
  watch: {},
  methods: {
    ...mapActions('userStore', ['setUserData']),
    async savePersonal(data) {
      console.debug('savePersonal/data', data); //DELETE
      this.saveLoading = true;
      await editPersonal({
        data: {
          uuid: this.userData.uuid,
          ...data,
        },
        store: this.$store,
      });
      this.saveLoading = false;
    },
    async savePassport(data) {
      console.debug('savePassport/data', data); //DELETE
      this.saveLoading = true;
      await editPassport({
        data: {
          uuid: this.userData.uuid,
          ...data,
        },
        store: this.$store,
      });
      this.saveLoading = false;
    },
    async savePaymentDetails(data) {
      console.debug('savePaymentDetails/data', data); //DELETE
      this.saveLoading = true;
      await editPaymentDetails({
        data: {
          uuid: this.userData.uuid,
          ...data,
        },
        store: this.$store,
      });
      this.saveLoading = false;
    },
    async saveContract(data) {
      console.debug('saveContract/data', data); //DELETE
      this.saveLoading = true;
      await editContract({
        data: {
          uuid: this.userData.uuid,
          ...data,
        },
        store: this.$store,
      });
      this.saveLoading = false;
    },
    async sendForVerification() {
      console.debug('sendForVerification'); //DELETE
      this.submitLoading = true;
      await submitForVerification({
        data: {
          uuid: this.userData.uuid,
        },
        store: this.$store,
      });
      this.submitLoading = false;
    },
  },
  created() { },
  mounted() { },
};
