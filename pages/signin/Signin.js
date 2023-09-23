import { authSigninService } from "@/services/authSigninService";
import * as validation from "@/services/formValidation";

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
        validation.required(),
      ],
      email: '',
      emailRules: [
        validation.required(),
        validation.email(),
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
    redirectTo(to) {
      this.$router.push({ name: to });
    },
    async signin() {
      console.debug("pages/signin/methods/signin/isValid", this.$refs.form.validate()); //DELETE

      if (this.$refs.form.validate()) {
        this.loading = true;
        const response = await authSigninService(this.email, this.password);
        console.debug('pages/signin/methods/signin/response', response); //DELETE
        this.loading = false;

        if (response.status !== 200) {
          this.signinFailed = true;
          return;
        }

        this.redirectTo('index');
      }
    },
  },
  created() {
    console.debug("pages/signin/created"); //DELETE
  },
  mounted() {
    console.debug("pages/signin/mounted"); //DELETE
  },
};
