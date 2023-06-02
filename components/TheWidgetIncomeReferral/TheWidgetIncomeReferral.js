import AppCard from '@/components/AppCard/AppCard.vue';
import AppButton from '@/components/AppButton/AppButton.vue';
import StatusWarning from '@/assets/svg/status_warning_circle_outline.svg'
import StatusSuccess from '@/assets/svg/check_circle.svg'
import InfoBlock from './components/InfoBlock/InfoBlock.vue';

export default {
  components: {
    AppCard,
    AppButton,
    StatusWarning,
    StatusSuccess,
    InfoBlock,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingPayout: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      default: 0,
    },
    amountThreshold: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      RuCurrencySymbol: '₽',
      amountTitle: 'Общий доход',
      amountTitleResidual: 'Остаточная сумма',
    };
  },
  computed: {
    isSuccess() {
      return !this.amountResidual;
    },
    amountResidual() {
      const delta = this.amountThreshold - this.amount;
      return delta > 0 ? delta : 0;
    },
  },
  watch: {},
  methods: {
    getStatusTitle() {
      return `Порог в ${this.convertToMoneyFormat(this.amountThreshold)} ${this.isSuccess ? '' : 'не'} достигнут`;
    },
    convertToMoneyFormat(value) {
      return `${value}${this.RuCurrencySymbol}`;
    },
    payout() {
      this.$emit('payout');
    },
  },
  created() { },
  mounted() { },
};
