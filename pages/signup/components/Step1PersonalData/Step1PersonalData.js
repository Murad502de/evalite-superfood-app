import { mapActions, mapGetters, } from 'vuex';
import * as validation from "@/services/formValidation";
import { createUploadedFileUrl } from '@/utils/file.js';
import AppAvatar from '@/components/AppAvatar/AppAvatar.vue';

export default {
  components: {
    AppAvatar,
  },

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
      secondNameRules: [
        validation.required(),
      ],
      firstName: '',
      firstNameRules: [
        validation.required(),
      ],
      thirdName: '',
      thirdNameRules: [
        validation.required(),
      ],
      gender: '',
      genderRules: [
        validation.required(),
      ],
      birthday: '',
      birthdayRules: [
        validation.required(),
      ],
      email: '',
      emailRules: [
        validation.required(),
        validation.email(),
      ],
      phone: '',
      phoneRules: [
        validation.required(),
      ],
      avatarFile: null,
      avatarName: null,
      avatarUrl: null,
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
    avatarFile(newVal) {
      this.setUserSignupData({ user_avatar: newVal });
    },
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
      this.setUserSignupData({ user_gender: newVal === 'муж' ? 'male' : 'female' });
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
    uploadAvatar(file = null) {
      //TODO call validate service

      console.debug(file); //DELETE

      this.avatarFile = file;
      this.avatarName = file.name;
      this.avatarUrl = createUploadedFileUrl(file);
    },
    deleteAvatar() {
      this.avatarFile = null;
      this.avatarName = null;
      this.avatarUrl = null;
    },
  },

  created() { },
  mounted() { },
}
