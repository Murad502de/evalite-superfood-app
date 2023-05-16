import * as validation from "@/services/formValidation";
import AppCard from '@/components/AppCard/AppCard.vue';
import AppButton from '@/components/AppButton/AppButton.vue';

export default {
  components: {
    AppCard,
    AppButton,
  },
  props: {},
  data() {
    return {
      valid: true,
      loading: false,
      amocrmSubdomain: '',
      amocrmSubdomainRules: [
        validation.required(),
      ],
      amocrmRedirectUri: '',
      amocrmRedirectUriRules: [
        validation.required(),
      ],
      amocrmClientSecret: '',
      amocrmClientSecretRules: [
        validation.required(),
      ],
      amocrmUtmSourceId: '',
      amocrmUtmSourceIdRules: [
        validation.required(),
        validation.numbers(),
      ],
      personalLinkHost: '',
      personalLinkHostRules: [
        validation.required(),
        validation.url(),
      ],
      minPayout: '',
      minPayoutRules: [
        validation.required(),
        validation.numbers(),
      ],
      percentage: '',
      percentageRules: [
        validation.required(),
        validation.numbers(),
      ],
      percentageLevels: [
        {
          "uuid": "111f19f4-30d8-4245-bfd3-28a8b6ca209e",
          "percentage": 10
        },
        {
          "uuid": "682d0d7a-a30c-40e9-92ba-c4b94f425271",
          "percentage": 5
        }
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    deletePercentageLevel(uuid) {
      this.percentageLevels = this.percentageLevels.filter(
        percentageLevel => percentageLevel.uuid !== uuid
      );
    },
    addPercentageLevel() {
      this.percentageLevels.push({
        "uuid": new Date().getTime(),
        "percentage": 0
      });
    },
  },
  created() { },
  mounted() { },
};

