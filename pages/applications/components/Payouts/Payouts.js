import { payoutsGet } from '@/api/payouts/payoutsGet';
import { payoutsUuidPayout } from '@/api/payouts/payoutsUuidPayout';
import { payoutsUuidGet } from '@/api/payouts/payoutsUuidGet';
import { parseFromISOtoDdMmYyyy } from '@/utils/date';
import AppTable from '@/components/AppTable/AppTable.vue';
import AppButton from '@/components/AppButton/AppButton.vue';
import PayoutsDetail from './components/PayoutsDetail/PayoutsDetail.vue';
import { payoutsUuidGetAdapter } from '@/api/adapters/payouts/payoutsUuidGetAdapter';
import AppFilterTable from '@/components/AppFilterTable/AppFilterTable.vue';
import AppTextField from '@/components/AppTextField/AppTextField.vue';
import AppPickerDate from '@/components/AppPickerDate/AppPickerDate.vue';
import AppSelect from '@/components/AppSelect/AppSelect.vue';
import { getPayoutStatusByName } from '@/utils/payout';
import { parseFromDatePickerDdMmYyyy } from '@/utils/date';
import AppStatus from '@/components/AppStatus/AppStatus.vue';

export default {
  components: {
    AppTable,
    AppButton,
    PayoutsDetail,
    AppFilterTable,
    AppTextField,
    AppPickerDate,
    AppSelect,
    AppStatus,
  },

  props: {},
  data() {
    return {
      headers: [
        {
          value: 'date',
          text: 'Дата',
          align: 'start',
        },
        {
          value: 'email',
          text: 'Email',
        },
        {
          value: 'full_name',
          text: 'ФИО',
        },
        {
          value: 'price',
          text: 'Сумма',
        },
        {
          value: 'status',
          text: 'Статус',
        },

      ],
      items: [],
      loading: false,
      page: 1,
      lastPage: 1,
      itemsPerPage: 5,
      itemsLength: 0,

      payoutsDetail: {},
      payoutsDetailEdited: false,
      payoutsDetailDialog: false,
      payoutsDetailLoading: false,
      payoutsDetailSaveLoading: false,
      payoutsDetailApproveLoading: false,
      filterDate: null,
      filterEmail: null,
      filterName: null,
      filterStatus: null,
      sortBy: undefined,
      sortDesc: false,
      payoutsStatuses: ['в обработке', 'выплачено'],
    };
  },
  computed: {},

  watch: {},
  methods: {
    closePayoutsDetailDialog() {
      console.debug('Payouts/methods/closePayoutsDetailDialog'); //DELETE
      this.payoutsDetailDialog = false;
      this.payoutsDetail = null;
    },
    async approvePayoutsDetail(receiptFile) {
      console.debug('Payouts/methods/approvePayoutsDetail/this.payoutsDetail', this.payoutsDetail); //DELETE
      console.debug('Payouts/methods/approvePayoutsDetail/receiptFile', receiptFile); //DELETE
      this.payoutsDetailApproveLoading = true;
      await this.closePayout(this.payoutsDetail, receiptFile);
      this.payoutsDetailApproveLoading = false;
      this.payoutsDetailDialog = false;
      this.payoutsDetail = null;
    },
    async openPayoutsDetailDialog(payout) {
      console.debug('Payouts/methods/openPayoutsDetailDialog/payout', payout); //DELETE
      this.payoutsDetailLoading = true;
      this.payoutsDetailDialog = true;
      const payoutsUuidGetResponse = await payoutsUuidGet({ uuid: payout.uuid });
      console.debug('Payouts/methods/openPayoutsDetailDialog/payoutsUuidGetResponse', payoutsUuidGetResponse); //DELETE

      if (payoutsUuidGetResponse.status !== 200) {
        alert('Ошибка получения детализации заявки на вывод средств'); //FIXME implement with vuetify
      }

      this.payoutsDetail = await payoutsUuidGetAdapter(payoutsUuidGetResponse.data.data);
      this.payoutsDetailLoading = false;
    },
    async closePayout(payout, receiptFile) {
      console.debug('Payouts/methods/closePayout/payout', payout); //DELETE
      console.debug('Payouts/methods/closePayout/receiptFile', receiptFile); //DELETE
      const payoutsUuidPayoutResponse = await payoutsUuidPayout({ uuid: payout.uuid, receiptFile });

      if (payoutsUuidPayoutResponse.status !== 200) {
        alert('Ошибка закрытия выплаты'); //FIXME implement with vuetify
      }

      // this.deletePayoutFromList(payout);
      await this.fetchPayouts();
    },
    deletePayoutFromList(payout) {
      console.debug('Ver/deletePayoutFromList/payout', payout); //DELETE
      console.debug('Ver/deletePayoutFromList/items', this.items); //DELETE
      this.items = this.items.filter(item => item.uuid !== payout.uuid);
    },
    async updatePage(e) {
      this.page = e.page;
      await this.fetchPayouts();
    },
    async updateItemsPerPage(e) {
      this.page = 1;
      this.itemsPerPage = e.itemsPerPage;
      await this.fetchPayouts();
    },
    async fetchPayouts(lazy = false) {
      this.items = lazy ? this.items : [];
      this.loading = true;
      const payoutsGetResponse = await payoutsGet({
        page: this.page,
        perPage: this.itemsPerPage,
        filterDateFrom: parseFromDatePickerDdMmYyyy(this.filterDate ? this.filterDate[0] : null),
        filterDateTo: parseFromDatePickerDdMmYyyy(this.filterDate ? this.filterDate[1] : null),
        filterPartnerEmail: this.filterEmail,
        filterPartnerFullName: this.filterName,
        filterStatus: getPayoutStatusByName(this.filterStatus),
        orderBy: this.sortBy,
        orderingRule: !!this.sortDesc ? 'desc' : 'asc', //FIXME make with util
      });

      console.debug('payoutsGetResponse', payoutsGetResponse); //DELETE

      if (payoutsGetResponse.status !== 200) {
        alert('Ошибка получения списка выплат'); //FIXME implement with vuetify
      }

      this.page = payoutsGetResponse.data.meta.current_page;
      this.lastPage = payoutsGetResponse.data.meta.last_page;
      this.itemsPerPage = payoutsGetResponse.data.meta.per_page;
      this.itemsLength = payoutsGetResponse.data.meta.total;

      if (lazy) {
        this.items = [];
      }

      this.items = payoutsGetResponse.data.data.map(item => ({
        uuid: item.uuid,
        status: item.status,
        email: item.user.email,
        full_name: `${item.user.second_name} ${item.user.first_name} ${item.user.third_name}`,
        price: item.price,
        date: parseFromISOtoDdMmYyyy(item.created_at),
      }));
      this.loading = false;
    },
    async applyFilter() {
      console.debug('Payouts/applyFilter/filterDate', this.filterDate); //DELETE
      console.debug('Payouts/applyFilter/filterEmail', this.filterEmail); //DELETE
      console.debug('Payouts/applyFilter/filterName', this.filterName); //DELETE
      await this.fetchPayouts(true);
    },
    async resetFilter() {
      console.debug('Payouts/resetFilter'); //DELETE
      this.filterDate = null;
      this.filterEmail = null;
      this.filterName = null;
      this.filterStatus = null;
      await this.fetchPayouts(true);
    },
    setFilterDate(value) {
      console.debug('setFilterDate/value', value); //DELETE
      this.filterDate = value;
    },
    async updateOptions(data) {
      console.debug('Payouts/methods/updateOptions/data', data); //DELETE
      this.setSorting(data.sortBy[0], data.sortDesc[0]);
    },
    async setSorting(sortBy, sortDesc) {
      if (sortBy === undefined && this.sortBy === undefined) return;
      console.debug('Payouts/setSorting/sortBy', sortBy); //DELETE
      console.debug('Payouts/setSorting/sortDesc', sortDesc); //DELETE
      console.debug('Payouts/setSorting/this.sortBy', this.sortBy); //DELETE
      console.debug('Payouts/setSorting/this.sortDesc', this.sortDesc); //DELETE

      switch (sortBy) {
        case 'email':
          this.sortBy = 'email';
          break;
        case 'full_name':
          this.sortBy = 'partner_full_name';
          break;
        case 'price':
          this.sortBy = 'price';
          break;
        case 'status':
          this.sortBy = 'status';
          break;
        default:
          this.sortBy = 'payouts.created_at';
          break;
      }

      this.sortDesc = sortDesc;
      await this.fetchPayouts(true);
    },
  },

  async created() {
    await this.fetchPayouts();
  },
  mounted() { },
}
