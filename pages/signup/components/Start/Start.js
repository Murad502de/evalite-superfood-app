import RocketSvg from '@/assets/svg/rocket.svg';
import AppButton from '@/components/AppButton/AppButton.vue';

export default {
  components: {
    RocketSvg,
    AppButton,
  },

  props: {},
  data() {
    return {
      valid: true,
      loading: false,
      title: 'Стать партнёром',
      subTitle: 'EVALITE - это игры, сервисы, продукты и комьюнити людей для ускорения, облегчения и снижения затрат на саморазвитие.',
      code: null,
      codeRules: [
        v => !!v || 'Данное поле обязательно к заполнению'
      ],
      btnStyles: {
        height: '48px',
      },
      continueBtnTitle: 'Продолжить',
      signinBtnTitle: 'Войти',
      signinBtnStyles: {
        color: '#263043',
      },
      actionsInfoTitle: 'Уже зарегистрировались? Нажимайте войти',
    };
  },
  computed: {},

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    next() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        setTimeout(() => {
          this.loading = false;
          // this.signinFailed = true;

          this.$emit('next');
        }, 5000);
      }
    },
    signin() {
      this.$router.push({ name: 'signin' });
    },

    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
