export default {
  components: {},

  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      valid: true,
      loading: false,
      secondName: '',
      secondNameRules: [],
      firstName: '',
      firstNameRules: [],
      thirdName: '',
      thirdNameRules: [],
      gender: '',
      genderRules: [],
      birthday: '',
      birthdayRules: [],
      email: '',
      emailRules: [],
      phone: '',
      phoneRules: [],
    };
  },
  computed: {
    computedProgress() {
      let progress = 0;

      if (this.secondName.length) {
        progress += 10;
      }
      if (this.firstName.length) {
        progress += 10;
      }
      if (this.thirdName.length) {
        progress += 10;
      }
      if (this.gender.length) {
        progress += 10;
      }
      if (this.birthday.length) {
        progress += 10;
      }
      if (this.email.length) {
        progress += 10;
      }
      if (this.phone.length) {
        progress += 10;
      }

      return progress;
    },
  },

  watch: {
    computedProgress(newVal) {
      this.$emit('update:progress', newVal);
    },
  },
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
