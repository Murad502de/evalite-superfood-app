import EmailCard from "./components/EmailCard";
import ConfirmCard from "./components/ConfirmCard";
import PassCard from "./components/PassCard";
import { usersCheckEmail } from '@/api/users/usersCheckEmail';
import { usersPasswordReset } from '@/api/users/usersPasswordReset';
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
      emailCardLoading: false,
      confirmCardConfirmCodeLoading: false,
      confirmCardSendCodeLoading: false,
      passCardUpdatePassLoading: false,
    };
  },
  computed: {},
  watch: {
    forgotFailed(newVal, oldVal) {
      console.debug("pages/forgot/watch/forgotFailed/newVal", newVal); //DELETE
      console.debug("pages/forgot/watch/forgotFailed/oldVal", oldVal); //DELETE

      if (newVal) {
        setTimeout(() => {
          console.debug("pages/forgot/watch/forgotFailed/setTimeout"); //DELETE

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
      console.debug("pages/forgot/methods/confirmCardSendCodeToConfirm/code", code); //DELETE
      this.confirmCardConfirmCodeLoading = true;
      setTimeout(() => {
        this.step = 3;
        this.confirmCardConfirmCodeLoading = false;
      }, 3000);
    },
    async confirmCardSendCodeToEmail(email) {
      console.debug("pages/forgot/methods/confirmCardSendCodeToEmail/email"); //DELETE
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
      console.debug("pages/forgot/methods/updatePassword/password", password); //DELETE
      this.passCardUpdatePassLoading = true;

      setTimeout(() => {
        this.passCardUpdatePassLoading = false;
        this.$router.push({ name: 'signin' });
      }, 3000);
    },
  },

  created() {
    console.debug("pages/forgot/created"); //DELETE
  },
  mounted() {
    console.debug("pages/forgot/mounted"); //DELETE
  },
};
