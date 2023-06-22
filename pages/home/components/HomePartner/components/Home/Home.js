import { mapGetters, mapActions, } from 'vuex';
import * as httpResponse from '@/shared/httpResponses';
import { usersSalesDirectGet } from '@/api/users/usersSalesDirectGet';
import { usersSalesBonussesGet } from '@/api/users/usersSalesBonussesGet';
import { usersPayoutsGet } from '@/api/users/usersPayoutsGet';
import { usersIncomeGet } from '@/api/users/usersIncomeGet';
import { usersSalesPayoutPost } from '@/api/users/usersSalesPayoutPost';
import { payoutsUuidGetAdapter } from '@/api/adapters/payouts/payoutsUuidGetAdapter';
import { usersIncomeGetAdapter } from '@/api/adapters/users/usersIncomeGetAdapter';
import { usersSalesGetAdapter } from '@/api/adapters/users/usersSalesGetAdapter';
import { usersSalesBonussesGetAdapter } from '@/api/adapters/users/usersSalesBonussesGetAdapter';
import TheWidgetIncomeReferral from '@/components/TheWidgetIncomeReferral/TheWidgetIncomeReferral.vue';
import AppTable from '@/components/AppTable/AppTable.vue';
import AppStatus from '@/components/AppStatus/AppStatus.vue';
import AppAvatar from '@/components/AppAvatar/AppAvatar.vue';
import FilterTable from './components/FilterTable/FilterTable.vue';
import AppTextField from '@/components/AppTextField/AppTextField.vue';
import AppSelect from '@/components/AppSelect/AppSelect.vue';

export default {
  components: {
    TheWidgetIncomeReferral,
    AppTable,
    AppStatus,
    AppAvatar,
    FilterTable,
    AppTextField,
    AppSelect,
  },
  props: {},
  data() {
    return {
      widgetIncomeReferralLoading: false,
      widgetIncomeReferralLoadingPayout: false,
      amount: 0,
      amountThreshold: 0,
      tab: 0,

      salesDirectsFilterLoading: false,
      salesDirectsFilterDisabled: false,
      salesDirectsFilterName: '',
      salesDirectsFilterNameRules: [],
      salesDirectsFilterGender: '',
      salesDirectsFilterGenderRules: [],

      salesDirects: [],
      salesDirectsHeaders: [
        {
          value: 'date',
          text: 'Дата',
          align: 'start',
          // sortable: false,
        },
        {
          value: 'name',
          text: 'Название',
          // align: 'start',
          // sortable: false,
        },
        {
          value: 'price',
          text: 'Бюждет',
          // sortable: false,
        },
        {
          value: 'status',
          text: 'Статус',
          // sortable: false,
        },
      ],
      salesDirectsLoading: false,
      salesDirectsPage: 1,
      salesDirectsLastPage: 1,
      salesDirectsItemsPerPage: 25,
      salesDirectsItemsLength: 0,

      salesBonusses: [],
      salesBonussesHeaders: [
        {
          value: 'date',
          text: 'Дата',
          align: 'start',
          // sortable: false,
        },
        {
          value: 'name',
          text: 'Название',
          // align: 'start',
          // sortable: false,
        },
        {
          value: 'price',
          text: 'Бюждет',
          // sortable: false,
        },

        {
          value: 'partner',
          text: 'Партнер',
          // sortable: false,
        },
        {
          value: 'level',
          text: 'Уровень',
          // sortable: false,
        },

        {
          value: 'status',
          text: 'Статус',
          // sortable: false,
        },
      ],
      salesBonussesLoading: false,
      salesBonussesPage: 1,
      salesBonussesLastPage: 1,
      salesBonussesItemsPerPage: 25,
      salesBonussesItemsLength: 0,

      payouts: [],
      payoutsHeaders: [
        {
          value: 'date',
          text: 'Дата',
          align: 'start',
          // sortable: false,
        },
        {
          value: 'price',
          text: 'Бюждет',
          // sortable: false,
        },
        {
          value: 'status',
          text: 'Статус',
          // sortable: false,
        },
      ],
      payoutsLoading: false,
      payoutsPage: 1,
      payoutsLastPage: 1,
      payoutsItemsPerPage: 25,
      payoutsItemsLength: 0,

      payoutsCompleted: [],
      payoutsCompletedLoading: false,
      payoutsCompletedPage: 1,
      payoutsCompletedLastPage: 1,
      payoutsCompletedItemsPerPage: 5,
      payoutsCompletedItemsLength: 0,
    };
  },
  computed: {
    ...mapGetters('userStore', ['userData']),
    avatarUrl() {
      return this.userData.avatar;
    },
    userFullName() {
      return `${this.userData.second_name} ${this.userData.first_name} ${this.userData.third_name}`;
    },
    userReferralLink() {
      return this.userData.referral_link;
    },
    userInviteCode() {
      return this.userData.invite_code;
    },
  },
  watch: {},
  methods: {
    async payoutReferralIncome() {
      this.widgetIncomeReferralLoadingPayout = true;
      const usersSalesPayoutPostResponse = await usersSalesPayoutPost();
      this.widgetIncomeReferralLoadingPayout = false;

      if (usersSalesPayoutPostResponse.status !== httpResponse.HTTP_OK) {
        alert('Ошибка вывода средств'); //FIXME implement with vuetify
        return;
      }

      await this.init();
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
        this.salesBonusses.push(await usersSalesBonussesGetAdapter(sale))
      }

      this.salesBonussesLoading = false;

      console.debug('salesBonusses', this.salesBonusses); //DELETE
    },
    async fetchPayouts() {
      this.payouts = [];
      this.payoutsLoading = true;
      const usersPayoutsGetResponse = await usersPayoutsGet({
        page: this.payoutsPage,
        perPage: this.payoutsItemsPerPage,
        // status: 'processing',
      });
      console.debug('usersPayoutsGetResponse', usersPayoutsGetResponse); //DELETE

      if (usersPayoutsGetResponse.status !== httpResponse.HTTP_OK) {
        alert('Ошибка получения выплат реферала'); //FIXME implement with vuetify
        return;
      }

      this.payoutsPage = usersPayoutsGetResponse.data.meta.current_page;
      this.payoutsLastPage = usersPayoutsGetResponse.data.meta.last_page;
      this.payoutsItemsPerPage = usersPayoutsGetResponse.data.meta.per_page;
      this.payoutsItemsLength = usersPayoutsGetResponse.data.meta.total;

      for (let i = 0; i < usersPayoutsGetResponse.data.data.length; i++) {
        const payout = usersPayoutsGetResponse.data.data[i];
        this.payouts.push(await payoutsUuidGetAdapter(payout))
      }

      this.payoutsLoading = false;

      console.debug('payouts', this.payouts); //DELETE
    },
    async fetchPayoutsCompleted() {
      this.payoutsCompleted = [];
      this.payoutsCompletedLoading = true;
      const usersPayoutsGetResponse = await usersPayoutsGet({
        page: this.payoutsCompletedPage,
        perPage: this.payoutsCompletedItemsPerPage,
        status: 'completed',
      });
      console.debug('usersPayoutsGetResponse', usersPayoutsGetResponse); //DELETE

      if (usersPayoutsGetResponse.status !== httpResponse.HTTP_OK) {
        alert('Ошибка получения выплат реферала'); //FIXME implement with vuetify
        return;
      }

      this.payoutsCompletedPage = usersPayoutsGetResponse.data.meta.current_page;
      this.payoutsCompletedLastPage = usersPayoutsGetResponse.data.meta.last_page;
      this.payoutsCompletedItemsPerPage = usersPayoutsGetResponse.data.meta.per_page;
      this.payoutsCompletedItemsLength = usersPayoutsGetResponse.data.meta.total;

      for (let i = 0; i < usersPayoutsGetResponse.data.data.length; i++) {
        const payout = usersPayoutsGetResponse.data.data[i];
        this.payoutsCompleted.push(await payoutsUuidGetAdapter(payout))
      }

      this.payoutsCompletedLoading = false;

      console.debug('payouts', this.payoutsCompleted); //DELETE
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

    async updatePayoutsPage(e) {
      this.payoutsLastPage = e.page;
      await this.fetchPayouts();
    },
    async updatePayoutsItemsPerPage(e) {
      this.payoutsLastPage = 1;
      this.payoutsItemsPerPage = e.itemsPerPage;
      await this.fetchPayouts();
    },

    async updatePayoutsCompletedPage(e) {
      this.payoutsCompletedLastPage = e.page;
      await this.fetchPayoutsCompleted();
    },
    async updatePayoutsCompletedItemsPerPage(e) {
      this.payoutsCompletedLastPage = 1;
      this.payoutsCompletedItemsPerPage = e.itemsPerPage;
      await this.fetchPayoutsCompleted();
    },

    async applySalesDirectsFilter() {
      console.debug('applySalesDirectsFilter'); //DELETE
    },
    async applySalesBonussesFilter() {
      console.debug('applySalesBonussesFilter'); //DELETE
    },
    async applySalesPayoutsFilter() {
      console.debug('applySalesPayoutsFilter'); //DELETE
    },

    async init() {
      await this.fetchIncome();
      await this.fetchSalesDirects();
      await this.fetchSalesBonusses();
      await this.fetchPayouts();
      // await this.fetchPayoutsCompleted();
    },
  },
  async created() {
    await this.init();
  },
  mounted() { },
}
