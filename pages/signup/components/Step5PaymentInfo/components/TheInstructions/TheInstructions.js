import InfoIconSvg from '@/assets/svg/info.svg';
import ExternalLink from '@/assets/svg/external_link.svg';
import {
  paymentDetailsSberbank,
  paymentDetailsTinkoff,
  paymentDetailsAlfabank,
} from '@/shared/links';

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
          link: paymentDetailsSberbank,
        },
        {
          title: 'Тинькоф инструкция',
          link: paymentDetailsTinkoff,
        },
        {
          title: 'Альфабанк инструкция',
          link: paymentDetailsAlfabank,
        },
      ],
    };
  },
  computed: {},

  watch: {},
  methods: {
    open(instruction) {
      window.open(instruction.link, '_blank').focus();
    },
  },

  created() { },
  mounted() { },
}
