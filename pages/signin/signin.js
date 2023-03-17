export default {
  layout: "empty",
  components: {},

  props: {},
  data() {
    return {
      valid: true,
      loading: false,
      signinFailed: false,
      password: '',
      passwordRules: [
        v => !!v || 'Данное поле обязательно к заполнению'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Данное поле обязательно к заполнению',
        v => /.+@.+\..+/.test(v) || 'E-mail некорректный',
      ],
    };
  },
  computed: {},

  watch: {
    signinFailed(newVal, oldVal) {
      console.debug("pages/signin/watch/signinFailed/newVal", newVal); //DELETE
      console.debug("pages/signin/watch/signinFailed/oldVal", oldVal); //DELETE

      if (newVal) {
        setTimeout(() => {
          console.debug("pages/signin/watch/signinFailed/setTimeout"); //DELETE

          this.signinFailed = false;
        }, 5000);
      }
    },
  },
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    redirectTo(to) {
      this.$router.push({name: to});
    },
    signin() {
      console.debug("pages/signin/methods/signin/isValid", this.$refs.form.validate()); //DELETE

      if (this.$refs.form.validate()) {
        this.loading = true;

        setTimeout(() => {
          console.debug("pages/signin/methods/signin/setTimeout"); //DELETE

          this.loading = false;
          this.signinFailed = true;
        }, 5000);
      }

    },

    /* HELPERS */
    /* ACTIONS */
  },

  created() {
    console.debug("pages/signin/created"); //DELETE
  },
  mounted() {
    console.debug("pages/signin/mounted"); //DELETE
  },
};
