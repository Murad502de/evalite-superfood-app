import * as employmentTypes from '@/shared/employmentTypes';
import AppOverlay from '@/components/AppOverlay/AppOverlay.vue';
import AppCard from '@/components/AppCard/AppCard.vue';
import AppTextField from '@/components/AppTextField/AppTextField.vue';
import AppFormPaymentDetailsSE from '@/components/AppFormPaymentDetailsSE/AppFormPaymentDetailsSE.vue';
import AppFormPaymentDetailsIE from '@/components/AppFormPaymentDetailsIE/AppFormPaymentDetailsIE.vue';

export default {
  components: {
    AppOverlay,
    AppCard,
    AppTextField,
    AppFormPaymentDetailsSE,
    AppFormPaymentDetailsIE,
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
    },
    approve() {
      console.debug('PayoutsDetail/methods/approve'); //DELETE
      this.$emit('approve');
      this.tab = 0; //FIXME
    },
    init(data) {
      console.debug('PayoutsDetail/methods/init/data', data); //DELETE
      if (!data) return;
      this.user = data.user;
      this.date = data.date;
      this.fullName = data.user.fullName;
      this.price = data.price;
    },
  },
  created() {
    console.debug('PayoutsDetail/created/this.payout', this.payout); //DELETE
  },
  mounted() { },
}
