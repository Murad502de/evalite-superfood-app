import TheWidgetIncomeReferral from '@/components/TheWidgetIncomeReferral/TheWidgetIncomeReferral.vue';
import AppTable from '@/components/AppTable/AppTable.vue';

export default {
  components: {
    TheWidgetIncomeReferral,
    AppTable,
  },
  props: {},
  data() {
    return {
      tab: 0,
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
