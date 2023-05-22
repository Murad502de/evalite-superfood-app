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
  watch: {
    computedProgress(newVal) {
      console.debug('AppFormPersonalData/watch/computedProgress', newVal); //DELETE
      this.$emit('update:progress', newVal);
    },
    avatarFile(newVal) {
      console.debug('AppFormPersonalData/watch/avatarFile', newVal); //DELETE
      this.$emit('update:avatar', newVal);
    },
    secondName(newVal) {
      console.debug('AppFormPersonalData/watch/secondName', newVal); //DELETE
      this.$emit('update:second_name', newVal);
    },
    firstName(newVal) {
      console.debug('AppFormPersonalData/watch/firstName', newVal); //DELETE
      this.$emit('update:first_name', newVal);
    },
    thirdName(newVal) {
      console.debug('AppFormPersonalData/watch/thirdName', newVal); //DELETE
      this.$emit('update:third_name', newVal);
    },
    gender(newVal) {
      console.debug('AppFormPersonalData/watch/gender', newVal); //DELETE
      const genderCode = newVal === 'муж' ? 'male' : 'female';
      console.debug('AppFormPersonalData/watch/genderCode', genderCode); //DELETE
      this.$emit('update:gender', genderCode);
    },
    birthday(newVal) {
      console.debug('AppFormPersonalData/watch/birthday', newVal); //DELETE
      this.$emit('update:birthday', newVal);
    },
    email(newVal) {
      console.debug('AppFormPersonalData/watch/email', newVal); //DELETE
      this.$emit('update:email', newVal);
    },
    phone(newVal) {
      console.debug('AppFormPersonalData/watch/phone', newVal); //DELETE
      this.$emit('update:phone', newVal);
    },
  },
  methods: {
    uploadAvatar(file = null) {
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
