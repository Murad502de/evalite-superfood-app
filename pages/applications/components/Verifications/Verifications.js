import { usersVerifications } from '@/api/users/usersVerifications';
import { usersUuid } from '@/api/users/usersUuid';
import { userUuidInAdapter } from '@/api/adapters/users/userUuidInAdapter';
import { parseFromISOtoDdMmYyyy } from '@/utils/date';
import { getRoleTitleByCode } from '@/utils/roles';
import AppTable from '@/components/AppTable/AppTable.vue';
import VerificationsDetail from './components/VerificationsDetail/VerificationsDetail.vue';

export default {
  components: {
    AppTable,
    VerificationsDetail,
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
      items: [],
      loading: false,
      page: 1,
      lastPage: 1,
      itemsPerPage: 5,
      itemsLength: 0,

      verificationsDetail: {},
      verificationsDetailDialog: false,
      verificationsDetailLoading: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    async openVerificationsDetailDialog(e) {
      console.debug('Ver/openVerificationsDetailDialog/e', e); //DELETE
      this.verificationsDetailLoading = true;
      this.verificationsDetailDialog = true;
      const usersUuidResponse = await usersUuid(e.uuid);
      console.debug('usersUuidResponse', usersUuidResponse); //DELETE

      if (usersUuidResponse.status !== 200) {
        alert('Ошибка получения пользователя'); //FIXME implement with vuetify
      }

      this.verificationsDetail = await userUuidInAdapter(usersUuidResponse.data.data);
      this.verificationsDetailLoading = false;
    },

    updateAvatar(value) {
      console.debug('Verifications/updateAvatar/value', value); //DELETE
      this.verificationsDetail.avatarFile = value;
    },
    updateFirstName(value) {
      console.debug('Verifications/updateFirstName/value', value); //DELETE
      this.verificationsDetail.firstName = value;
    },
    updateSecondName(value) {
      console.debug('Verifications/updateSecondName/value', value); //DELETE
      this.verificationsDetail.secondName = value;
    },
    updateThirdName(value) {
      console.debug('Verifications/updateThirdName/value', value); //DELETE
      this.verificationsDetail.thirdName = value;
    },
    updateGender(value) {
      console.debug('Verifications/updateGender/value', value); //DELETE
      this.verificationsDetail.gender = value;
    },
    updateBirthday(value) {
      console.debug('Verifications/updateBirthday/value', value); //DELETE
      this.verificationsDetail.birthday = value;
    },
    updateEmail(value) {
      console.debug('Verifications/updateEmail/value', value); //DELETE
      this.verificationsDetail.email = value;
    },
    updatePhone(value) {
      console.debug('Verifications/updatePhone/value', value); //DELETE
      this.verificationsDetail.phone = value;
    },

    closeVerificationsDetailDialog() {
      console.debug('closeVerificationsDetailDialog/verificationsDetail', this.verificationsDetail); //DELETE
      this.verificationsDetailDialog = false;
      this.verificationsDetail = null;
    },
    async approveVerificationsDetail() {
      console.debug('approveVerificationsDetail/verificationsDetail', this.verificationsDetail); //DELETE
      this.verificationsDetailDialog = false;
      await this.fetchUsers();
    },
    async updatePage(e) {
      this.page = e.page;
      await this.fetchUsers();
    },
    async updateItemsPerPage(e) {
      this.page = 1;
      this.itemsPerPage = e.itemsPerPage;
      await this.fetchUsers();
    },
    async fetchUsers() {
      this.items = [];
      this.loading = true;
      const usersVerificationsResponse = await usersVerifications({ page: this.page, perPage: this.itemsPerPage });

      if (usersVerificationsResponse.status !== 200) {
        alert('Ошибка получения списка'); //FIXME implement with vuetify
      }

      this.page = usersVerificationsResponse.data.meta.current_page;
      this.lastPage = usersVerificationsResponse.data.meta.last_page;
      this.itemsPerPage = usersVerificationsResponse.data.meta.per_page;
      this.itemsLength = usersVerificationsResponse.data.meta.total;
      this.items = usersVerificationsResponse.data.data.map(item => ({
        uuid: item.uuid,
        full_name: `${item.second_name} ${item.first_name} ${item.third_name}`,
        date: parseFromISOtoDdMmYyyy(item.created_at),
        role: getRoleTitleByCode(item.role),
      }));
      this.loading = false;
    },
  },
  async created() {
    await this.fetchUsers();
  },
  mounted() { },
}
