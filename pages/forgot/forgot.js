export default {
  layout: "empty",
  components: {},

  props: {},
  data() {
    return {
      valid: true,
      loading: false,
      forgotFailed: false,
      password: '',
      passwordRules: [
        v => !!v || 'Данное поле обязательно к заполнению'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Данное поле обязательно к заполнению',
        v => /.+@.+\..+/.test(v) || 'E-mail некорректный',
      ]
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
    forgot() {
      console.debug("pages/forgot/methods/forgot/isValid", this.$refs.form.validate()); //DELETE

      if (this.$refs.form.validate()) {
        this.loading = true;

        setTimeout(() => {
          console.debug("pages/forgot/methods/forgot/setTimeout"); //DELETE

          this.loading = false;
          this.forgotFailed = true;
        }, 5000);
      }

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
