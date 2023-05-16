import * as validation from "@/services/formValidation";
import { configurationsRead } from '@/api/configurations/configurationsRead';
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
      fetching: false,
      amocrmSubdomain: '',
      amocrmSubdomainRules: [
        validation.required(),
      ],
      amocrmRedirectUri: '',
      amocrmRedirectUriRules: [
        validation.required(),
        validation.url(),
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
      percentageLevels: [],
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
    save() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        console.debug('configuration/save/amocrmSubdomain', this.amocrmSubdomain); //DELETE
        console.debug('configuration/save/amocrmRedirectUri', this.amocrmRedirectUri); //DELETE
        console.debug('configuration/save/amocrmClientSecret', this.amocrmClientSecret); //DELETE
        console.debug('configuration/save/amocrmUtmSourceId', this.amocrmUtmSourceId); //DELETE
        console.debug('configuration/save/personalLinkHost', this.personalLinkHost); //DELETE
        console.debug('configuration/save/minPayout', this.minPayout); //DELETE
        console.debug('configuration/save/percentage', this.percentage); //DELETE
        console.debug('configuration/save/percentageLevels', this.percentageLevels); //DELETE
      }
    },
  },
  async created() {
    this.fetching = true;
    const configurationsReadResponse = await configurationsRead();

    if (configurationsReadResponse.status === 200) {
      const data = configurationsReadResponse.data.data;
      this.amocrmSubdomain = data.amocrm_subdomain;
      this.amocrmRedirectUri = data.amocrm_redirect_uri;
      this.amocrmClientSecret = data.amocrm_client_secret;
      this.amocrmUtmSourceId = data.amocrm_utm_source_id;
      this.personalLinkHost = data.personal_link_host;
      this.minPayout = data.min_payout;
      this.percentage = data.percentage;
      this.percentageLevels = data.percentage_levels;
      this.fetching = false;
    } else {
      alert('Ошибка получения текущих настроек'); //FIXME implement with vuetify
    }
  },
  mounted() { },
};

