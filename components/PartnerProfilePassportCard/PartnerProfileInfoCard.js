import AppAvatar from '@/components/AppAvatar/AppAvatar.vue';
import { getUserVerificationStatusTitle, getUserVerificationStatusIconName } from '@/helpers/verificationHelper.js';

export default {
  components: {
    AppAvatar
  },
  props: {
    avatar: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    inviteCode: {
      type: String,
      required: true,
    },
    verificationStatus: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      test: ''
    };
  },
  computed: {
    infos() {
      return [
        {
          title: 'Дата рождения',
          value: this.birthday,
        },
        {
          title: 'Номер телефона',
          value: this.tel,
        },
        {
          title: 'Email',
          value: this.email,
        },
      ];
    }
  },
  watch: {},
  methods: {
    edit() {
      this.$emit('edit');
    },
    getVerificationStatusTitle() {
      return getUserVerificationStatusTitle(this.verificationStatus);
    },
    getVerificationStatusIcon() {
      return getUserVerificationStatusIconName(this.verificationStatus);
    },
  },
  created() { },
  mounted() { },
};
