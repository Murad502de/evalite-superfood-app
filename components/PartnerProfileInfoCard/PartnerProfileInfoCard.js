import AppAvatar from '@/components/AppAvatar/AppAvatar.vue';
import * as verificationStatuses from '@/shared/verificationStatuses.js';

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
    getVerificationStatusIcon() {
      switch (this.verificationStatus) {
        case verificationStatuses.verified:
          return '';
        case verificationStatuses.notVerified:
          return '';
        case verificationStatuses.waiting:
          return '';
        case verificationStatuses.rejected:
          return '';
        case verificationStatuses.toUpdate:
          return '';
        default:
          return '';
      }
    },
    getVerificationStatusTitle() {
      switch (this.verificationStatus) {
        case verificationStatuses.verified:
          return 'Подтвержден';
        case verificationStatuses.notVerified:
          return 'Требуется подтверждение';
        case verificationStatuses.waiting:
          return 'В обработке';
        case verificationStatuses.rejected:
          return 'Запрос отклонен';
        case verificationStatuses.toUpdate:
          return 'Требуется обновление';
        default:
          return 'Ошибка';
      }
    },
  },
  created() { },
  mounted() { },
};
