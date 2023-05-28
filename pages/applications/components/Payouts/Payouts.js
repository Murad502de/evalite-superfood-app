import { payoutsReadProcessing } from '@/api/payouts/payoutsReadProcessing';
import { payoutsUuidPayout } from '@/api/payouts/payoutsUuidPayout';
import { payoutsUuidGet } from '@/api/payouts/payoutsUuidGet';
import { parseFromISOtoDdMmYyyy } from '@/utils/date';
import AppTable from '@/components/AppTable/AppTable.vue';
import AppButton from '@/components/AppButton/AppButton.vue';
import PayoutsDetail from './components/PayoutsDetail/PayoutsDetail.vue';
import { payoutsUuidGetAdapter } from '@/api/adapters/payouts/payoutsUuidGetAdapter';

export default {
  components: {
    AppTable,
    AppButton,
    PayoutsDetail,
  },

  props: {},
  data() {
    return {
      headers: [
        {
          value: 'date',
          text: 'Дата',
          sortable: false,
          align: 'start',
        },
        {
          value: 'full_name',
          text: 'ФИО',
          sortable: false,
        },
        {
          value: 'price',
          text: 'Сумма',
          sortable: false,
        },
        {
          value: 'action',
          text: '',
          sortable: false,
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
    };
  },
  computed: {},

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    closePayoutsDetailDialog() {
      console.debug('Payouts/methods/closePayoutsDetailDialog'); //DELETE
      this.payoutsDetailDialog = false;
      this.payoutsDetail = null;
    },
    async approvePayoutsDetail() {
      console.debug('Payouts/methods/approvePayoutsDetail/this.payoutsDetail', this.payoutsDetail); //DELETE
      this.payoutsDetailApproveLoading = true;
      await this.closePayout(this.payoutsDetail);
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
    async closePayout(payout) {
      console.debug('Payouts/methods/closePayout/payout', payout); //DELETE
      const payoutsUuidPayoutResponse = await payoutsUuidPayout({ uuid: payout.uuid });

      if (payoutsUuidPayoutResponse.status !== 200) {
        alert('Ошибка закрытия выплаты'); //FIXME implement with vuetify
      }

      this.deletePayoutFromList(payout);
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
    /* HELPERS */
    /* ACTIONS */
    async fetchPayouts() {
      this.items = [];
      this.loading = true;
      const payoutsReadProcessingResponse = await payoutsReadProcessing({ page: this.page, perPage: this.itemsPerPage });

      console.debug('payoutsReadProcessingResponse', payoutsReadProcessingResponse); //DELETE

      if (payoutsReadProcessingResponse.status !== 200) {
        alert('Ошибка получения списка выплат'); //FIXME implement with vuetify
      }

      this.page = payoutsReadProcessingResponse.data.meta.current_page;
      this.lastPage = payoutsReadProcessingResponse.data.meta.last_page;
      this.itemsPerPage = payoutsReadProcessingResponse.data.meta.per_page;
      this.itemsLength = payoutsReadProcessingResponse.data.meta.total;
      this.items = payoutsReadProcessingResponse.data.data.map(item => ({
        uuid: item.uuid,
        full_name: `${item.user.second_name} ${item.user.first_name} ${item.user.third_name}`,
        price: item.price,
        date: parseFromISOtoDdMmYyyy(item.created_at),
      }));
      this.loading = false;
    },
  },

  async created() {
    await this.fetchPayouts();
  },
  mounted() { },
}
