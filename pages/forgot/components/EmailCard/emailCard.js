import * as validation from "@/services/formValidation";

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
      email: '',
      emailRules: [
        validation.required(),
        validation.email(),
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    sendCodeToEmail() {
      console.debug("pages/forgot/methods/sendCodeToEmail/isValid", this.$refs.form.validate()); //DELETE

      if (this.$refs.form.validate()) {
        this.$emit('sendCodeToEmail', this.email);
      }
    },
  },
  created() {
    console.debug("pages/forgot/EmailCard/created"); //DELETE
  },
  mounted() {
    console.debug("pages/forgot/EmailCard/mounted"); //DELETE
  },
}
