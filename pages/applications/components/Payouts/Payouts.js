import { payoutsReadProcessing } from '@/api/payouts/payoutsReadProcessing';
import { parseFromISOtoDdMmYyyy } from '@/utils/date';
import AppTable from '@/components/AppTable/AppTable.vue';

export default {
  components: {
    AppTable,
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
      ],
      items: [],
      loading: false,
      page: 1,
      lastPage: 1,
      itemsPerPage: 5,
      itemsLength: 0,
    };
  },
  computed: {},

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    onRowClick(e) {
      console.debug('Ver/onRowClick/e', e);
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
      this.loading = true;
      const payoutsReadProcessingResponse = await payoutsReadProcessing({ page: this.page, perPage: this.itemsPerPage });

      console.debug('payoutsReadProcessingResponse', payoutsReadProcessingResponse); //DELETE

      if (payoutsReadProcessingResponse.status !== 200) {
        alert('Ошибка получения списка'); //FIXME implement with vuetify
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
