import InfoIconSvg from '@/assets/svg/info.svg';
import ExternalLink from '@/assets/svg/external_link.svg';

export default {
  components: {
    InfoIconSvg,
    ExternalLink,
  },

  props: {},
  data() {
    return {
      title: 'Где взять платежные реквизиты карты?',
      info: 'Ниже подготовлены краткие инструкции, как найти платежные реквизиты в личных кабинетах популярных банков.',
      instructions: [
        {
          title: 'Сбербанк инструкция',
        },
        {
          title: 'Тинькоф инструкция',
        },
        {
          title: 'Альфабанк инструкция',
        },
      ],
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
