import { payoutsReadProcessing } from '@/api/payouts/payoutsReadProcessing';
import { payoutsUuidPayout } from '@/api/payouts/payoutsUuidPayout';
import { parseFromISOtoDdMmYyyy } from '@/utils/date';
import AppTable from '@/components/AppTable/AppTable.vue';
import AppButton from '@/components/AppButton/AppButton.vue';
import PayoutsDetail from './components/PayoutsDetail/PayoutsDetail.vue';

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
      console.debug('Payouts/methods/approvePayoutsDetail'); //DELETE
      this.payoutsDetailDialog = true;

      // const usersUuidStatusVerificationSetResponse = await usersUuidStatusVerificationSet(this.verificationsDetail.uuid, 'completed');

      // console.debug('usersUuidStatusVerificationSetResponse', usersUuidStatusVerificationSetResponse); //DELETE

      // if (usersUuidStatusVerificationSetResponse.status !== 200) {
      //   alert('Ошибка утверждения пользователя'); //FIXME implement with vuetify
      // }

      this.payoutsDetailApproveLoading = false;
      this.payoutsDetailDialog = false;
      this.payoutsDetail = null;
      await this.fetchPayouts();
    },
    async openPayoutsDetailDialog(e) {
      console.debug('Payouts/methods/openPayoutsDetailDialog/e', e); //DELETE
      this.payoutsDetailLoading = true;
      this.payoutsDetailDialog = true;
      // const usersUuidResponse = await usersUuid(e.uuid);
      // console.debug('usersUuidResponse', usersUuidResponse); //DELETE

      // if (usersUuidResponse.status !== 200) {
      //   alert('Ошибка получения пользователя'); //FIXME implement with vuetify
      // }

      // this.payoutsDetail = await userUuidInAdapter(usersUuidResponse.data.data);
      this.payoutsDetailLoading = false;
    },
    async closePayout(payout) {
      console.debug('Ver/closePayout/payout', payout); //DELETE
      payout.closeLoading = true;
      const payoutsUuidPayoutResponse = await payoutsUuidPayout({ uuid: payout.uuid });

      if (payoutsUuidPayoutResponse.status !== 200) {
        alert('Ошибка закрытия выплаты'); //FIXME implement with vuetify
      }

      payout.closeLoading = false;
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
        closeLoading: false,
      }));
      this.loading = false;
    },
  },

  async created() {
    await this.fetchPayouts();
  },
  mounted() { },
}
