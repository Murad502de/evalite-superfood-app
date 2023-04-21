import { mapActions, mapGetters, } from 'vuex';

export default {
  components: {},

  props: {
    progress: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: true,
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
    ...mapGetters('userSignupStore', ['userSignupData']), //DELETE
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
    secondName(newVal) {
      this.setUserSignupData({ user_second_name: newVal });
    },
    firstName(newVal) {
      this.setUserSignupData({ user_first_name: newVal });
    },
    thirdName(newVal) {
      this.setUserSignupData({ user_third_name: newVal });
    },
    gender(newVal) {
      this.setUserSignupData({ user_gender: newVal });
    },
    birthday(newVal) {
      this.setUserSignupData({ user_birthday: newVal });
    },
    email(newVal) {
      this.setUserSignupData({ user_email: newVal });
    },
    phone(newVal) {
      this.setUserSignupData({ user_phone: newVal });
    },
  },
  methods: {
    ...mapActions('userSignupStore', ['setUserSignupData']),
  },

  created() { },
  mounted() { },
}
