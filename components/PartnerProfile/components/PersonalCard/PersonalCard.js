import AppCard from '@/components/AppCard/AppCard.vue';
import AppAvatar from '@/components/AppAvatar/AppAvatar.vue';
import AppButton from '@/components/AppButton/AppButton.vue';
import Stub from './components/Stub/Stub.vue';
import { getUserVerificationStatusTitle, getUserVerificationStatusIconName } from '@/helpers/verificationHelper.js';
import { parseFromISOtoDdMmYyyy } from '@/utils/date';

export default {
  components: {
    AppCard,
    AppAvatar,
    AppButton,
    Stub,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    submitLoading: {
      type: Boolean,
      default: false,
    },
    hideSubmitBtn: {
      type: Boolean,
      default: false,
    },
    hideStatus: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      test: ''
    };
  },
  computed: {
    avatar() {
      return this.user?.avatar;
    },
    name() {
      return `${this.user?.secondName} ${this.user?.firstName} ${this.user?.thirdName}`;
    },
    inviteCode() {
      return this.user?.inviteCode;
    },
    birthday() {
      return this.user?.birthday ? parseFromISOtoDdMmYyyy(this.user.birthday) : null;
    },
    email() {
      return this.user?.email;
    },
    phone() {
      return this.user?.phone;
    },
    verificationStatus() {
      return this.user?.verificationStatus;
    },
    infos() {
      return [
        {
          title: 'Дата рождения',
          value: this.birthday,
        },
        {
          title: 'Номер телефона',
          value: this.phone,
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
      if (this.disabled || this.submitLoading) return;
      this.$emit('edit');
    },
    getVerificationStatusTitle() {
      return getUserVerificationStatusTitle(this.verificationStatus);
    },
    getVerificationStatusIcon() {
      return getUserVerificationStatusIconName(this.verificationStatus);
    },
    submit() {
      this.$emit('submit');
    },
  },
  created() { },
  mounted() { },
};
