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
          value: 'full_name',
          text: 'ФИО',
          align: 'start',
          sortable: false,
        },
        {
          value: 'date',
          text: 'Дата',
          sortable: false,
        },
        {
          value: 'role',
          text: 'Роль',
          sortable: false,
        },
      ],
      items: [
        {
          full_name: 'Иванов Иван Иванович',
          date: '10.02.1990',
          role: 'Реферал',
        },
        {
          full_name: 'Иванов Иван Иванович',
          date: '10.02.1990',
          role: 'Реферал',
        },
        {
          full_name: 'Иванов Иван Иванович',
          date: '10.02.1990',
          role: 'Реферал',
        },
      ],
      loading: false,
      page: 2,
      lastPage: 2,
      itemsPerPage: 5,
      itemsLength: 8,
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
    updatePage(e) {
      console.debug('Ver/updatePage/e', e);
      this.page = e.page;
    },
    updateItemsPerPage(e) {
      console.debug('Ver/updateItemsPerPage/e', e);
      this.page = 1;
      this.itemsPerPage = e.itemsPerPage;
    },
    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
