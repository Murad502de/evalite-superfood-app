import * as httpResponse from '@/shared/httpResponses';
import { usersSalesDirectGet } from '@/api/users/usersSalesDirectGet';
import { usersSalesBonussesGet } from '@/api/users/usersSalesBonussesGet';
import { usersPayoutsGet } from '@/api/users/usersPayoutsGet';
import { usersIncomeGet } from '@/api/users/usersIncomeGet';
import { payoutsUuidGetAdapter } from '@/api/adapters/payouts/payoutsUuidGetAdapter';
import { usersIncomeGetAdapter } from '@/api/adapters/users/usersIncomeGetAdapter';
import { usersSalesGetAdapter } from '@/api/adapters/users/usersSalesGetAdapter';

import TheWidgetIncomeReferral from '@/components/TheWidgetIncomeReferral/TheWidgetIncomeReferral.vue';
import AppTable from '@/components/AppTable/AppTable.vue';
import AppStatus from '@/components/AppStatus/AppStatus.vue';

export default {
  components: {
    TheWidgetIncomeReferral,
    AppTable,
    AppStatus,
  },
  props: {},
  data() {
    return {
      widgetIncomeReferralLoading: false,
      widgetIncomeReferralLoadingPayout: false,
      amount: 0,
      amountThreshold: 0,
      tab: 0,

      salesDirects: [],
      salesDirectsHeaders: [
        {
          value: 'name',
          text: 'Название',
          align: 'start',
          sortable: false,
        },
        {
          value: 'price',
          text: 'Бюждет',
          sortable: false,
        },
        {
          value: 'status',
          text: 'Статус',
          sortable: false,
        },
      ],
      salesDirectsLoading: false,
      salesDirectsPage: 1,
      salesDirectsLastPage: 1,
      salesDirectsItemsPerPage: 5,
      salesDirectsItemsLength: 0,

      salesBonusses: [],
      salesBonussesHeaders: [
        {
          value: 'name',
          text: 'Название',
          align: 'start',
          sortable: false,
        },
        {
          value: 'price',
          text: 'Бюждет',
          sortable: false,
        },
        {
          value: 'status',
          text: 'Статус',
          sortable: false,
        },
      ],
      salesBonussesLoading: false,
      salesBonussesPage: 1,
      salesBonussesLastPage: 1,
      salesBonussesItemsPerPage: 5,
      salesBonussesItemsLength: 0,

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

      if (usersIncomeGetResponse.status !== httpResponse.HTTP_OK) {
        alert('Ошибка получения дохода реферала'); //FIXME implement with vuetify
        return;
      }

      const income = await usersIncomeGetAdapter(usersIncomeGetResponse.data);
      this.amount = income.amount;
      this.amountThreshold = income.amountThreshold;
      this.widgetIncomeReferralLoading = false;
    },
    async fetchSalesDirects() {
      this.salesDirects = [];
      this.salesDirectsLoading = true;
      const usersSalesDirectGetResponse = await usersSalesDirectGet({
        page: this.salesDirectsPage,
        perPage: this.salesDirectsItemsPerPage,
      });
      console.debug('usersSalesDirectGetResponse', usersSalesDirectGetResponse); //DELETE

      if (usersSalesDirectGetResponse.status !== httpResponse.HTTP_OK) {
        alert('Ошибка получения прямых продаж реферала'); //FIXME implement with vuetify
        return;
      }

      this.salesDirectsPage = usersSalesDirectGetResponse.data.meta.current_page;
      this.salesDirectsLastPage = usersSalesDirectGetResponse.data.meta.last_page;
      this.salesDirectsItemsPerPage = usersSalesDirectGetResponse.data.meta.per_page;
      this.salesDirectsItemsLength = usersSalesDirectGetResponse.data.meta.total;

      for (let i = 0; i < usersSalesDirectGetResponse.data.data.length; i++) {
        const sale = usersSalesDirectGetResponse.data.data[i];
        this.salesDirects.push(await usersSalesGetAdapter(sale))
      }

      this.salesDirectsLoading = false;

      console.debug('salesDirects', this.salesDirects); //DELETE
    },
    async fetchSalesBonusses() {
      this.salesBonusses = [];
      this.salesBonussesLoading = true;
      const usersSalesBonussesGetResponse = await usersSalesBonussesGet({
        page: this.salesBonussesPage,
        perPage: this.salesBonussesItemsPerPage,
      });
      console.debug('usersSalesBonussesGetResponse', usersSalesBonussesGetResponse); //DELETE

      if (usersSalesBonussesGetResponse.status !== httpResponse.HTTP_OK) {
        alert('Ошибка получения бонусов реферала'); //FIXME implement with vuetify
        return;
      }

      this.salesBonussesPage = usersSalesBonussesGetResponse.data.meta.current_page;
      this.salesBonussesLastPage = usersSalesBonussesGetResponse.data.meta.last_page;
      this.salesBonussesItemsPerPage = usersSalesBonussesGetResponse.data.meta.per_page;
      this.salesBonussesItemsLength = usersSalesBonussesGetResponse.data.meta.total;

      for (let i = 0; i < usersSalesBonussesGetResponse.data.data.length; i++) {
        const sale = usersSalesBonussesGetResponse.data.data[i];
        this.salesBonusses.push(await usersSalesGetAdapter(sale))
      }

      this.salesBonussesLoading = false;

      console.debug('salesBonusses', this.salesBonusses); //DELETE
    },
    async fetchPayouts() {
      const usersPayoutsGetResponse = await usersPayoutsGet({ page: 1, perPage: 5, });
      console.debug('usersPayoutsGetResponse', usersPayoutsGetResponse); //DELETE

      if (usersPayoutsGetResponse.status !== httpResponse.HTTP_OK) {
        alert('Ошибка получения выплат реферала'); //FIXME implement with vuetify
        return;
      }

      for (let i = 0; i < usersPayoutsGetResponse.data.data.length; i++) {
        const payout = usersPayoutsGetResponse.data.data[i];
        this.payouts.push(await payoutsUuidGetAdapter(payout))
      }

      console.debug('payouts', this.payouts); //DELETE
    },

    async updateSalesDirectsPage(e) {
      this.salesDirectsPage = e.page;
      await this.fetchSalesDirects();
    },
    async updateSalesDirectsItemsPerPage(e) {
      this.salesDirectsPage = 1;
      this.salesDirectsItemsPerPage = e.itemsPerPage;
      await this.fetchSalesDirects();
    },

    async updateSalesBonussesPage(e) {
      this.salesBonussesPage = e.page;
      await this.fetchSalesBonusses();
    },
    async updateSalesBonussesItemsPerPage(e) {
      this.salesBonussesPage = 1;
      this.salesBonussesItemsPerPage = e.itemsPerPage;
      await this.fetchSalesBonusses();
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
