import EmailCard from "./components/EmailCard";
import ConfirmCard from "./components/ConfirmCard";
import PassCard from "./components/PassCard";
import { usersCheckEmail } from '@/api/users/usersCheckEmail';
import { usersPasswordReset } from '@/api/users/usersPasswordReset';
import { usersPasswordResetConfirm } from '@/api/users/usersPasswordResetConfirm';
import { usersPasswordUpdate } from '@/api/users/usersPasswordUpdate';

export default {
  layout: "empty",
  components: {
    EmailCard,
    ConfirmCard,
    PassCard,
  },
  props: {},
  data() {
    return {
      step: 1,
      email: '',
      code: '',
      emailCardLoading: false,
      confirmCardConfirmCodeLoading: false,
      confirmCardSendCodeLoading: false,
      passCardUpdatePassLoading: false,
    };
  },
  computed: {},
  watch: {
    forgotFailed(newVal, oldVal) {
      if (newVal) {
        setTimeout(() => {
          this.forgotFailed = false;
        }, 5000);
      }
    },
  },
  methods: {
    async emailCardSendCodeToEmail(email) {
      this.email = email;
      this.emailCardLoading = true;
      const usersCheckEmailResponse = await usersCheckEmail(this.email);

      if (usersCheckEmailResponse.status !== 200) {
        this.emailCardLoading = false;
        alert('Пользователь с таким E-mail не найден'); //FIXME implement with vuetify
        return;
      }

      const usersPasswordResetResponse = await usersPasswordReset(email);

      if (usersPasswordResetResponse.status !== 200) {
        this.emailCardLoading = false;
        alert('Ошибка, при отправке кода'); //FIXME implement with vuetify
        return;
      }

      this.step = 2;
      this.emailCardLoading = false;
    },
    async confirmCardSendCodeToConfirm(code) {
      this.code = code;
      this.confirmCardConfirmCodeLoading = true;
      const usersPasswordResetConfirmResponse = await usersPasswordResetConfirm(this.email, this.code);

      if (usersPasswordResetConfirmResponse.status !== 200) {
        this.confirmCardConfirmCodeLoading = false;
        alert('Неправильный код'); //FIXME implement with vuetify
        return;
      }

      this.step = 3;
      this.confirmCardConfirmCodeLoading = false;
    },
    async confirmCardSendCodeToEmail(email) {
      this.confirmCardSendCodeLoading = true;
      const usersPasswordResetResponse = await usersPasswordReset(email);

      if (usersPasswordResetResponse.status !== 200) {
        this.confirmCardSendCodeLoading = false;
        alert('Ошибка, при отправке кода'); //FIXME implement with vuetify
        return;
      }

      this.confirmCardSendCodeLoading = false;
    },
    async updatePassword(password) {
      this.passCardUpdatePassLoading = true;
      const usersPasswordUpdateResponse = await usersPasswordUpdate(this.email, this.code, password);

      if (usersPasswordUpdateResponse.status !== 200) {
        this.passCardUpdatePassLoading = false;
        alert('Произошла ошибка, при обновлении пароля'); //FIXME implement with vuetify
        return;
      }

      this.passCardUpdatePassLoading = false;
      this.$router.push({ name: 'signin' });
    },
  },

  created() {
  },
  mounted() {
  },
};
