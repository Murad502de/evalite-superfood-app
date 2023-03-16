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
      step: 3,
      emailCardLoading: false,
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
    sendCodeToEmail() {
      console.debug("pages/forgot/methods/sendCodeToEmail"); //DELETE

      this.emailCardLoading = true;

      setTimeout(() => {
        console.debug("pages/forgot/methods/sendCodeToEmail/setTimeout"); //DELETE

        this.emailCardLoading = false;
        this.step = 2;
      }, 5000);
    },
    sendCodeToConfirm() {
      console.debug("pages/forgot/methods/sendCodeToConfirm"); //DELETE
    },
    updatePassword() {
      console.debug("pages/forgot/methods/updatePassword"); //DELETE
    },

    /* HELPERS */
    /* ACTIONS */
  },

  created() {
    console.debug("pages/forgot/created"); //DELETE
  },
  mounted() {
    console.debug("pages/forgot/mounted"); //DELETE
  },
};
