export default {
  components: {},

  props: {
    email: {
      type: String,
      require: true,
    },
    confirmCodeLoading: {
      type: Boolean,
      default: false,
    },
    sendCodeLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: true,
      code: '',
      codeLength: 4,
      timerCount: 30,
      timer: null,
    };
  },
  computed: {
    isConfirmCodeActive() {
      return this.code.length === this.codeLength
    },
    isSendCodeActive() {
      return !this.timerCount;
    },
    sendCodeTitle() {
      return this.timerCount
        ? `Отправить повторно через ${this.timerCount} сек`
        : 'Отправить повторно';
    },
  },

  watch: {
    timerCount(newVal) {
      if (!newVal) clearInterval(this.timer);
    },
    sendCodeLoading(newVal) {
      if (!newVal) this.startTimer();
    },
  },
  methods: {
    startTimer() {
      this.timerCount = 30;
      this.timer = setInterval(() => {
        this.timerCount--;
      }, 1000);
    },
    sendCodeToConfirm() {
      this.$emit('sendCodeToConfirm', this.code);
    },
    sendCodeToEmail() {
      this.$emit('sendCodeToEmail', this.email);
    },
  },

  created() {
    console.debug("pages/forgot/ConfirmCard/created"); //DELETE

    this.startTimer();
  },
  mounted() {
    console.debug("pages/forgot/ConfirmCard/mounted"); //DELETE
  },
}
