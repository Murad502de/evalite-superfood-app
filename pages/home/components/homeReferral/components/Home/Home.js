import { usersSalesDirectGet } from '@/api/users/usersSalesDirectGet';
import { usersSalesBonussesGet } from '@/api/users/usersSalesBonussesGet';
import { usersPayoutsGet } from '@/api/users/usersPayoutsGet';
import { usersIncomeGet } from '@/api/users/usersIncomeGet';
import { payoutsUuidGetAdapter } from '@/api/adapters/payouts/payoutsUuidGetAdapter';
import { usersIncomeGetAdapter } from '@/api/adapters/payouts/usersIncomeGetAdapter';

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
      widgetIncomeReferralLoading: false,
      widgetIncomeReferralLoadingPayout: false,
      amount: 0,
      amountThreshold: 0,
      tab: 0,
      payouts: [],
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
    async fetchIncome() {
      this.widgetIncomeReferralLoading = true;
      const usersIncomeGetResponse = await usersIncomeGet({ page: 1, perPage: 5, });
      const income = await usersIncomeGetAdapter(usersIncomeGetResponse.data);
      this.amount = income.amount;
      this.amountThreshold = income.amountThreshold;
      this.widgetIncomeReferralLoading = false;
    },
    async fetchSalesDirects() {
      const usersSalesDirectGetResponse = await usersSalesDirectGet({ page: 1, perPage: 5, });
      console.debug('usersSalesDirectGetResponse', usersSalesDirectGetResponse); //DELETE
    },
    async fetchSalesBonusses() {
      const usersSalesBonussesGetResponse = await usersSalesBonussesGet({ page: 1, perPage: 5, });
      console.debug('usersSalesBonussesGetResponse', usersSalesBonussesGetResponse); //DELETE
    },
    async fetchPayouts() {
      const usersPayoutsGetResponse = await usersPayoutsGet({ page: 1, perPage: 5, });
      console.debug('usersPayoutsGetResponse', usersPayoutsGetResponse); //DELETE

      for (let i = 0; i < usersPayoutsGetResponse.data.data.length; i++) {
        const payout = usersPayoutsGetResponse.data.data[0];
        this.payouts.push(await payoutsUuidGetAdapter(payout))
      }

      console.debug('payouts', this.payouts); //DELETE
    },
  },
  async created() {
    await this.fetchIncome();
    await this.fetchSalesDirects();
    await this.fetchSalesBonusses();
    await this.fetchPayouts();
  },
  mounted() { },
}
