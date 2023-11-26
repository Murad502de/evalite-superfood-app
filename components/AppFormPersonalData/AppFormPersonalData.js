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
    data: {
      type: Object | null,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: true,
      secondName: null,
      secondNameRules: [
        validation.required(),
      ],
      firstName: null,
      firstNameRules: [
        validation.required(),
      ],
      thirdName: null,
      thirdNameRules: [
        validation.required(),
      ],
      gender: null,
      genderRules: [
        validation.required(),
      ],
      birthday: null,
      birthdayRules: [
        validation.required(),
        validation.date(),
      ],
      email: null,
      emailRules: [
        validation.required(),
        validation.email(),
      ],
      phone: null,
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
      if (this.secondName && this.secondName.length) progress += 10;
      if (this.firstName && this.firstName.length) progress += 10;
      if (this.thirdName && this.thirdName.length) progress += 10;
      if (this.gender && this.gender.length) progress += 10;
      if (this.birthday && this.birthday.length) progress += 10;
      if (this.email && this.email.length) progress += 10;
      if (this.phone && this.phone.length) progress += 10;
      return progress;
    },
    formPlaceholder() {
      return formPlaceholder;
    },
  },
  watch: {
    data(newVal) {
      console.debug('DATA watch', newVal); //DELETE
      if (newVal === null) {
        this.avatarUrl = null;
        this.firstName = null;
        this.secondName = null;
        this.thirdName = null;
        this.gender = null;
        this.birthday = null;
        this.email = null;
        this.phone = null;
        return;
      }

      this.avatarUrl = newVal.avatar;
      this.firstName = newVal.firstName;
      this.secondName = newVal.secondName;
      this.thirdName = newVal.thirdName;
      this.gender = newVal.gender === 'male' ? 'муж' : 'жен';
      this.birthday = newVal.birthday;
      this.email = newVal.email;
      this.phone = newVal.phone;
    },
    computedProgress(newVal, oldVal) {
      if (newVal === null || oldVal === null) return;
      this.$emit('update:progress', newVal);
    },
    avatarFile(newVal, oldVal) {
      this.$emit('update:avatar', newVal);
    },
    secondName(newVal, oldVal) {
      if (newVal === null || oldVal === null) return;
      this.$emit('update:second_name', newVal);
    },
    firstName(newVal, oldVal) {
      if (newVal === null || oldVal === null) return;
      this.$emit('update:first_name', newVal);
    },
    thirdName(newVal, oldVal) {
      if (newVal === null || oldVal === null) return;
      this.$emit('update:third_name', newVal);
    },
    gender(newVal, oldVal) {
      if (newVal === null || oldVal === null) return;
      const genderCode = newVal === 'муж' ? 'male' : 'female';
      this.$emit('update:gender', genderCode);
    },
    birthday(newVal, oldVal) {
      if (newVal === null || oldVal === null) return;
      this.$emit('update:birthday', newVal);
    },
    email(newVal, oldVal) {
      if (newVal === null || oldVal === null) return;
      this.$emit('update:email', newVal);
    },
    phone(newVal, oldVal) {
      if (newVal === null || oldVal === null) return;
      this.$emit('update:phone', newVal);
    },
  },
  methods: {
    uploadAvatar(file = null) {
      this.avatarFile = file;
      this.avatarName = file.name;
      this.avatarUrl = createUploadedFileUrl(file);
    },
    deleteAvatar() {
      this.avatarFile = null;
      this.avatarName = null;
      this.avatarUrl = null;
    },
    validate() {
      return this.$refs.form.validate();
    },
    init(data) {
      console.debug('DATA init', data); //DELETE
      if (data === null) {
        this.avatarUrl = null;
        this.firstName = null;
        this.secondName = null;
        this.thirdName = null;
        this.gender = null;
        this.birthday = null;
        this.email = null;
        this.phone = null;
        return;
      }

      this.avatarUrl = data.avatar;
      this.firstName = data.firstName;
      this.secondName = data.secondName;
      this.thirdName = data.thirdName;
      this.gender = data.gender === 'male' ? 'муж' : 'жен';
      this.birthday = data.birthday;
      this.email = data.email;
      this.phone = data.phone;
    },
  },
  created() {
    console.debug('DATA created', this.data); //DELETE

    if (this.data) {
      this.init(this.data);
    }
  },
  mounted() {
    console.debug('DATA mounted', this.data); //DELETE
  },
}
