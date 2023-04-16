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
      codeRules: [],
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
    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
