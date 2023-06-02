import TheWidgetIncomeReferral from '@/components/TheWidgetIncomeReferral/TheWidgetIncomeReferral.vue';

export default {
  components: {
    TheWidgetIncomeReferral,
  },
  props: {},
  data() {
    return {
      widgetIncomeReferralLoading: false,
      widgetIncomeReferralLoadingPayout: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    payoutReferralIncome() {
      this.widgetIncomeReferralLoadingPayout = true;

      setTimeout(() => { //DELETE
        this.widgetIncomeReferralLoadingPayout = false;
      }, 2000);
    },
  },
  created() { },
  mounted() { },
}
