import EmailCard from "./components/EmailCard";
import ConfirmCard from "./components/ConfirmCard";
import PassCard from "./components/PassCard";

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
      confirnCardConfirmCodeLoading: false,
      confirnCardSendCodeLoading: false,
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
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    async emailCardSendCodeToEmail(email) {
      console.debug("pages/forgot/methods/emailCardSendCodeToEmail/email", email); //DELETE

      await this.sendCodeToEmail(email);

      this.emailCardLoading = true;

      setTimeout(() => {
        console.debug("pages/forgot/methods/sendCodeToEmail/setTimeout"); //DELETE

        this.step = 2;
        this.emailCardLoading = false;
      }, 3000);
    },
    async confirmCardSendCodeToConfirm(code) {
      console.debug("pages/forgot/methods/confirmCardSendCodeToConfirm/code", code); //DELETE

      this.confirnCardConfirmCodeLoading = true;

      setTimeout(() => {
        this.step = 3;
        this.confirnCardConfirmCodeLoading = false;
      }, 3000);
    },
    async confirmCardSendCodeToEmail(email) {
      console.debug("pages/forgot/methods/confirmCardSendCodeToEmail/email"); //DELETE

      await this.sendCodeToEmail(email);

      this.confirnCardSendCodeLoading = true;

      setTimeout(() => {
        this.confirnCardSendCodeLoading = false;
      }, 3000);
    },
    async updatePassword(password) {
      console.debug("pages/forgot/methods/updatePassword/password", password); //DELETE

      this.passCardUpdatePassLoading = true;

      setTimeout(() => {
        this.passCardUpdatePassLoading = false;
        this.$router.push({name: 'signin'});
      }, 3000);
    },

    /* HELPERS */
    /* ACTIONS */
    async sendCodeToEmail(email) {
      console.debug("pages/forgot/methods/sendCodeToEmail/email", email); //DELETE

      this.email = email;
    },
  },

  created() {
    console.debug("pages/forgot/created"); //DELETE
  },
  mounted() {
    console.debug("pages/forgot/mounted"); //DELETE
  },
};
