import * as validation from "@/services/formValidation";
import * as formPlaceholder from "@/services/formPlaceholder";
import { createUploadedFileUrl } from '@/utils/file.js';
import AppAvatar from '@/components/AppAvatar/AppAvatar.vue';
import AppTextField from '@/components/AppTextField/AppTextField.vue';
import AppSelect from '@/components/AppSelect/AppSelect.vue';

export default {
  components: {
    AppAvatar,
    AppTextField,
    AppSelect,
  },
  props: {
    title: {
      type: String,
      default: '',
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
        validation.date(),
      ],
      email: '',
      emailRules: [
        validation.required(),
        validation.email(),
      ],
      phone: '',
      phoneRules: [
        validation.required(),
        validation.phoneRus(),
      ],
      avatarFile: null,
      avatarName: null,
      avatarUrl: null,
      avatarError: false,
    };
  },
  computed: {
    computedProgress() {
      let progress = 0;

      if (this.secondName.length) progress += 10;
      if (this.firstName.length) progress += 10;
      if (this.thirdName.length) progress += 10;
      if (this.gender.length) progress += 10;
      if (this.birthday.length) progress += 10;
      if (this.email.length) progress += 10;
      if (this.phone.length) progress += 10;

      return progress;
    },
    formPlaceholder() {
      return formPlaceholder;
    },
  },
  watch: {},
  methods: {
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
