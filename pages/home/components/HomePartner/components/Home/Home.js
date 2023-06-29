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
import AppFilterTable from '@/components/AppFilterTable/AppFilterTable.vue';
import AppTextField from '@/components/AppTextField/AppTextField.vue';
import AppSelect from '@/components/AppSelect/AppSelect.vue';
import AppPickerDate from '@/components/AppPickerDate/AppPickerDate.vue';
import { getSaleStatusByName } from '@/utils/sale';
import { getPayoutStatusByName } from '@/utils/payout';
import { parseFromDatePickerDdMmYyyy } from '@/utils/date';

export default {
  components: {
    TheWidgetIncomeReferral,
    AppTable,
    AppStatus,
    AppAvatar,
    AppFilterTable,
    AppTextField,
    AppSelect,
    AppPickerDate,
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

      payoutsCompleted: [],
      payoutsCompletedLoading: false,
      payoutsCompletedPage: 1,
      payoutsCompletedLastPage: 1,
      payoutsCompletedItemsPerPage: 5,
      payoutsCompletedItemsLength: 0,

      filterSDDate: null,
      filterSDName: '',
      filterSDStatus: '',
      sortSDBy: undefined,
      sortSDDesc: false,
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
      SDLoading: false,
      salesDirectsPage: 1,
      salesDirectsLastPage: 1,
      salesDirectsItemsPerPage: 25,
      salesDirectsItemsLength: 0,

      filterSBDate: null,
      filterSBName: '',
      filterSBPartner: '',
      filterSBLevel: '',
      filterSBStatus: '',
      sortSBBy: undefined,
      sortSBDesc: false,
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

      filterPDate: null,
      filterPStatus: '',
      sortPBy: undefined,
      sortPDesc: false,
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

      salesStatuses: ['не выплачено', 'в обработке', 'выплачено'],
      payoutsStatuses: ['в обработке', 'выплачено'],
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
    async fetchSalesDirects(lazy = false) {
      this.salesDirects = lazy ? this.salesDirects : [];
      this.SDLoading = true;
      const usersSalesDirectGetResponse = await usersSalesDirectGet({
        page: this.salesDirectsPage,
        perPage: this.salesDirectsItemsPerPage,
        filterDateFrom: parseFromDatePickerDdMmYyyy(this.filterSDDate ? this.filterSDDate[0] : null),
        filterDateTo: parseFromDatePickerDdMmYyyy(this.filterSDDate ? this.filterSDDate[1] : null),
        filterLeadName: this.filterSDName,
        filterStatus: getSaleStatusByName(this.filterSDStatus),
        orderBy: this.sortSDBy,
        orderingRule: !!this.sortSDDesc ? 'desc' : 'asc', //FIXME make with util
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

      if (lazy) {
        this.salesDirects = [];
      }

      for (let i = 0; i < usersSalesDirectGetResponse.data.data.length; i++) {
        const sale = usersSalesDirectGetResponse.data.data[i];
        this.salesDirects.push(await usersSalesGetAdapter(sale))
      }

      this.SDLoading = false;

      console.debug('salesDirects', this.salesDirects); //DELETE
    },
    async fetchSalesBonusses(sort = false) {
      this.salesBonusses = sort ? this.salesBonusses : [];
      this.salesBonussesLoading = true;
      const usersSalesBonussesGetResponse = await usersSalesBonussesGet({
        page: this.salesBonussesPage,
        perPage: this.salesBonussesItemsPerPage,
        orderBy: this.sortSBBy,
        orderingRule: !!this.sortSBDesc ? 'desc' : 'asc', //FIXME make with util
        filterDateFrom: parseFromDatePickerDdMmYyyy(this.filterSBDate ? this.filterSBDate[0] : null),
        filterDateTo: parseFromDatePickerDdMmYyyy(this.filterSBDate ? this.filterSBDate[1] : null),
        filterLeadName: this.filterSBName,
        filterPartnerName: this.filterSBPartner,
        filterLevel: this.filterSBLevel,
        filterStatus: getSaleStatusByName(this.filterSBStatus),
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

      if (sort) {
        this.salesBonusses = [];
      }

      for (let i = 0; i < usersSalesBonussesGetResponse.data.data.length; i++) {
        const sale = usersSalesBonussesGetResponse.data.data[i];
        this.salesBonusses.push(await usersSalesBonussesGetAdapter(sale))
      }

      this.salesBonussesLoading = false;

      console.debug('salesBonusses', this.salesBonusses); //DELETE
    },
    async fetchPayouts(lazy = false) {
      this.payouts = lazy ? this.payouts : [];
      this.payoutsLoading = true;
      const usersPayoutsGetResponse = await usersPayoutsGet({
        page: this.payoutsPage,
        perPage: this.payoutsItemsPerPage,
        filterDateFrom: parseFromDatePickerDdMmYyyy(this.filterPDate ? this.filterPDate[0] : null),
        filterDateTo: parseFromDatePickerDdMmYyyy(this.filterPDate ? this.filterPDate[1] : null),
        filterStatus: getPayoutStatusByName(this.filterPStatus),
        orderBy: this.sortPBy,
        orderingRule: !!this.sortPDesc ? 'desc' : 'asc', //FIXME make with util
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

      if (lazy) {
        this.payouts = [];
      }

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
    async updateSDOptions(data) {
      console.debug('updateSDOptions/data', data); //DELETE
      this.setSDSorting(data.sortBy[0], data.sortDesc[0]);
    },
    async setSDSorting(sortBy, sortDesc) {
      if (sortBy === undefined && this.sortSDBy === undefined) return;
      console.debug('setSDSorting/sortBy', sortBy); //DELETE
      console.debug('setSDSorting/sortDesc', sortDesc); //DELETE
      console.debug('setSDSorting/sortSDBy', this.sortSDBy); //DELETE
      console.debug('setSDSorting/sortSDDesc', this.sortSDDesc); //DELETE

      switch (sortBy) {
        case 'name':
          this.sortSDBy = 'created_at';
          break;
        case 'price':
          this.sortSDBy = 'price';
          break;
        case 'status':
          this.sortSDBy = 'status';
          break;
        default:
          this.sortSDBy = 'created_at';
          break;
      }

      this.sortSDDesc = sortDesc;
      await this.fetchSalesDirects(true);
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
    async updateSBOptions(data) {
      console.debug('updateSBOptions/data', data); //DELETE
      this.setSBSorting(data.sortBy[0], data.sortDesc[0]);
    },
    async setSBSorting(sortBy, sortDesc) {
      if (sortBy === undefined && this.sortSBBy === undefined) return;
      console.debug('setSBSorting/sortBy', sortBy); //DELETE
      console.debug('setSBSorting/sortDesc', sortDesc); //DELETE
      console.debug('setSBSorting/sortSBBy', this.sortSBBy); //DELETE
      console.debug('setSBSorting/sortSBDesc', this.sortSBDesc); //DELETE

      switch (sortBy) {
        case 'name':
          this.sortSBBy = 'name';
          break;
        case 'price':
          this.sortSBBy = 'price';
          break;
        case 'partner':
          this.sortSBBy = 'partner_name';
          break;
        case 'level':
          this.sortSBBy = 'level';
          break;
        case 'status':
          this.sortSBBy = 'status';
          break;
        default:
          this.sortSBBy = 'created_at';
          break;
      }

      this.sortSBDesc = sortDesc;
      await this.fetchSalesBonusses(true);
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
    async updatePOptions(data) {
      console.debug('updatePOptions/data', data); //DELETE
      this.setPSorting(data.sortBy[0], data.sortDesc[0]);
    },
    async setPSorting(sortBy, sortDesc) {
      if (sortBy === undefined && this.sortPBy === undefined) return;
      console.debug('setPSorting/sortBy', sortBy); //DELETE
      console.debug('setPSorting/sortDesc', sortDesc); //DELETE
      console.debug('setPSorting/sortPBy', this.sortPBy); //DELETE
      console.debug('setPSorting/sortPDesc', this.sortPDesc); //DELETE

      switch (sortBy) {
        case 'price':
          this.sortPBy = 'price';
          break;
        case 'status':
          this.sortPBy = 'status';
          break;
        default:
          this.sortPBy = 'created_at';
          break;
      }

      this.sortPDesc = sortDesc;
      await this.fetchPayouts(true);
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

    async init() {
      await this.fetchIncome();
      await this.fetchSalesDirects();
      await this.fetchSalesBonusses();
      await this.fetchPayouts();
      // await this.fetchPayoutsCompleted();
    },

    setFilterSDDate(value) {
      console.debug('setFilterSDDate/value', value); //DELETE
      this.filterSDDate = value;
    },
    setFilterSBDate(value) {
      console.debug('setFilterSBDate/value', value); //DELETE
      this.filterSBDate = value;
    },
    setFilterPDate(value) {
      console.debug('setFilterPDate/value', value); //DELETE
      this.filterPDate = value;
    },

    async applyFilterSD() {
      console.debug('applyFilterSD/filterSDName', this.filterSDName); //DELETE
      console.debug('applyFilterSD/filterSDDate', this.filterSDDate); //DELETE
      console.debug('applyFilterSD/filterSDStatus', this.filterSDStatus); //DELETE
      await this.fetchSalesDirects(true);
    },
    async applyFilterSB() {
      console.debug('setFilterSBDate/filterSBDate', this.filterSBDate); //DELETE
      console.debug('setFilterSBDate/filterSBName', this.filterSBName); //DELETE
      console.debug('setFilterSBDate/filterSBPartner', this.filterSBPartner); //DELETE
      console.debug('setFilterSBDate/filterSBLevel', this.filterSBLevel); //DELETE
      console.debug('setFilterSBDate/filterSBStatus', this.filterSBStatus); //DELETE
      await this.fetchSalesBonusses(true);
    },
    async applyFilterP() {
      console.debug('applyFilterP/filterPDate', this.filterPDate); //DELETE
      console.debug('applyFilterP/filterPStatus', this.filterPStatus); //DELETE
      await this.fetchPayouts(true);
    },
  },
  async created() {
    await this.init();
  },
  mounted() { },
}
