import * as employmentTypes from '@/shared/employmentTypes';
import AppOverlay from '@/components/AppOverlay/AppOverlay.vue';
import AppCard from '@/components/AppCard/AppCard.vue';
import AppTextField from '@/components/AppTextField/AppTextField.vue';
import AppFormPaymentDetailsSE from '@/components/AppFormPaymentDetailsSE/AppFormPaymentDetailsSE.vue';
import AppFormPaymentDetailsIE from '@/components/AppFormPaymentDetailsIE/AppFormPaymentDetailsIE.vue';
import AppFormMedia from '@/components/AppFormMedia/AppFormMedia.vue';
import ReceiptSvg from '@/assets/svg/receipt.svg';
import { createUploadedFileUrl } from '@/utils/file.js';

export default {
  components: {
    AppOverlay,
    AppCard,
    AppTextField,
    AppFormPaymentDetailsSE,
    AppFormPaymentDetailsIE,
    AppFormMedia,
    ReceiptSvg,
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
    approveLoading: {
      type: Boolean,
      default: false,
    },
    edited: {
      type: Boolean,
      default: false,
    },
    payout: {
      type: Object | null,
      required: true,
    },
  },
  data() {
    return {
      tab: 0,
      valid: true,
      user: null,
      date: null,
      fullName: null,
      price: null,
      status: null,
      receiptDisabled: true,
      receiptMediaFile: null,
      receiptMediaName: null,
      receiptMediaUrl: null,
      receiptMediaError: false,
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
  watch: {
    payout(newVal) {
      console.debug('PayoutsDetail/watch/payout', newVal); //DELETE
      this.init(newVal);
    },
  },
  methods: {
    close() {
      console.debug('PayoutsDetail/methods/close'); //DELETE
      if (this.approveLoading) return;
      this.$emit('close');
      this.tab = 0;
      this.status = null;
    },
    approve() {
      console.debug('PayoutsDetail/methods/approve/!!receiptMediaUrl', !!this.receiptMediaUrl); //DELETE
      if (!this.receiptMediaUrl) {
        this.receiptMediaError = true;
        alert('Для утверждения выплаты, прикрепите подтверждающую квитанцию'); //FIXME implement with vuetify
        return;
      }

      this.receiptDisabled = true;
      this.$emit('approve', this.receiptMediaFile);
      this.tab = 0; //FIXME
      this.status = null;
    },
    init(data) {
      console.debug('PayoutsDetail/methods/init/data', data); //DELETE
      if (!data) return;
      this.user = data.user;
      this.date = data.date;
      this.fullName = data.user.fullName;
      this.price = data.price;
      this.receiptMediaUrl = data.receiptUrl
      this.status = data.status;
      this.receiptDisabled = this.status === 'completed';
    },
    uploadReceiptMedia(file = null) {
      if (this.loading || this.disabled) return;
      //TODO call validate service
      console.debug(file); //DELETE
      this.receiptMediaFile = file;
      this.receiptMediaName = file.name;
      this.receiptMediaUrl = createUploadedFileUrl(file);
      this.receiptMediaError = false;
    },
    deleteReceiptMedia() {
      if (this.loading || this.disabled) return;
      this.receiptMediaFile = null;
      this.receiptMediaName = null;
      this.receiptMediaUrl = null;
    },
  },
  created() {
    console.debug('PayoutsDetail/created/this.payout', this.payout); //DELETE
  },
  mounted() { },
}
