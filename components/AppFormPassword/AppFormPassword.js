import * as validation from "@/services/formValidation";

export default {
  components: {},
  props: {},
  data() {
    return {
      valid: true,
      password: '',
      passwordRules: [
        validation.required(),
        validation.passSpaces(),
        validation.passCyrillic(),
        // validation.passLength(),
        // validation.passCapitalLetters(),
        // validation.passLowerCase(),
        // validation.passSpecSymbols(),
      ],
      password1: '',
      showPass: false,
      showPass1: false,
      loading: false,
      title: 'Введите пароль',
      subTitle: 'Придумайте пароль, соответствующий требованиям ниже.',
      passInputLabel: 'Введите новый пароль',
      passInputAgainLabel: 'Введите новый пароль повторно',
      passRequirementsTitle: 'Вы можете ввести любой пароль который захотите, но во избежание кражи или взлома аккаунта мы предлагаем использовать:',
      passLengthTitle: 'длина — не менее 8 символов;',
      passCapitalLettersTitle: 'заглавные буквы;',
      passLowerCaseTitle: 'строчные буквы;',
      passOtherSymbolsTitle: 'цифры или специальные символы: %, #, $ и другие.'
    };
  },
  computed: {
    computedProgress() {
      let progress = 0;

      if (this.password.length) {
        progress += 50;
      }
      if (this.password1.length) {
        progress += 50;
      }

      return progress;
    },
  },
  watch: {
    computedProgress(newVal) {
      this.$emit('update:progress', newVal);
    },
    password(newVal) {
      this.$emit('update:password', newVal);
    },
  },
  methods: {},
  created() { },
  mounted() { },
}
