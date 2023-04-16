import ChechSvg from '@/assets/svg/check.svg';
import AppButton from '@/components/AppButton/AppButton.vue';

export default {
  components: {
    ChechSvg,
    AppButton,
  },

  props: {},
  data() {
    return {
      valid: true,
      loading: false,
      title: 'Регистрация завершена',
      subTitle: 'Поздравляем Вас! Вы успешно зарегистрировались в системе Evalite и сможете легко и быстро приступить к работе.',
      goToAccountBtnTitle: 'перейти в личный кабинет',
      btnStyles: {
        height: '48px',
      },
    };
  },
  computed: {},

  watch: {},
  methods: {
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    next() {
      this.$emit('next');
    },
    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
