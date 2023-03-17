export default {
  components: {},

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: true,
      password: '',
      password1: '',
      showPass: false,
      showPass1: false,
      passwordRules: [
        v => !!v || 'Данное поле обязательно к заполнению',
        v => !/\s/g.test(v) || 'Пароль не должен содержать пробелы',
        v => !/[а-яА-Я]/g.test(v) || 'Пароль не должен содержать кириллицу',
        v => v.length >= 8 || 'Длина пароля должна быть не менее 8 символов',
        v => /[A-Z]+/g.test(v) || 'Пароль должен содержать заглавные буквы',
        v => /[a-z]+/g.test(v) || 'Пароль должен содержать строчные буквы',
        v => /[\W\d_]/g.test(v) || 'Пароль должен содержать цифры или спец. символы',
      ],
    };
  },
  computed: {
    isBtnDisabled() {
      return !this.password.length ||
        !this.password1.length ||
        !this.valid ||
        this.password !== this.password1;
    },
  },

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    updatePassword() {
      this.$emit('updatePassword', this.password);
    },

    /* HELPERS */
    /* ACTIONS */
  },

  created() {
    console.debug("pages/forgot/PassCard/created"); //DELETE
  },
  mounted() {
    console.debug("pages/forgot/PassCard/mounted"); //DELETE
  },
}
