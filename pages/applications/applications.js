import { usersVerifications } from '@/api/users/usersVerifications';
import Verifications from './components/Verifications/Verifications.vue';
import Payouts from './components/Payouts/Payouts.vue';

export default {
  components: {
    Verifications,
    Payouts,
  },
  props: {},
  data() {
    return {
      tab: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {},
  async created() {
    const usersVerificationsResponse = await usersVerifications();

    console.debug('usersVerificationsResponse', usersVerificationsResponse); //DELETE

    if (usersVerificationsResponse.status !== 200) {
      alert('Ошибка сохранения настроек'); //FIXME implement with vuetify
    }
  },
  mounted() { },
};
