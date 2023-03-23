import EarthLogo from '@/assets/svg/earth.svg';
import InfoBlock from './components/InfoBlock';

export default {
  components: {
    EarthLogo,
    InfoBlock
  },

  props: {},
  data() {
    return {
      infoBlocks: [
        {
          icon: 'time',
          title: 'Быстрая оплата',
          text: 'Система ruqi.ru использует электроный документооборот, это эффективный способ подписывать.',
        },
        {
          icon: 'hand',
          title: 'Документы всегда доступны?',
          text: 'Система ruqi.ru использует электроный документооборот, это эффективный способ подписывать.',
        },
        {
          icon: 'docs',
          title: 'Быстрая оплата',
          text: 'Система ruqi.ru использует электроный документооборот, это эффективный способ подписывать.',
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
