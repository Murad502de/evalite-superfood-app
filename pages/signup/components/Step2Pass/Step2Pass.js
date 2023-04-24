import { mapActions, mapGetters, } from 'vuex';
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
        validation.passLength(),
        validation.passCapitalLetters(),
        validation.passLowerCase(),
        validation.passSpecSymbols(),
      ],
      password1: '',
      showPass: false,
      showPass1: false,
      loading: false,
      title: 'Введите пароль',
      subTitle: 'Придумайте пароль, соответствующий требованиям ниже.',
      passInputLabel: 'Введите новый пароль',
      passInputAgainLabel: 'Введите новый пароль повторно',
      passRequirementsTitle: 'Требования к паролю:',
      passLengthTitle: 'длина — не менее 8 символов;',
      passCapitalLettersTitle: 'заглавные буквы;',
      passLowerCaseTitle: 'строчные буквы;',
      passOtherSymbolsTitle: 'цифры или специальные символы: %, #, $ и другие.'
    };
  },
  computed: {
    ...mapGetters('userSignupStore', ['userSignupData']), //DELETE
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
      this.setUserSignupData({ user_password: newVal });
    },
  },
  methods: {
    ...mapActions('userSignupStore', ['setUserSignupData']),
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
    /* ACTIONS */
  },

  created() { },
  mounted() { },
}
