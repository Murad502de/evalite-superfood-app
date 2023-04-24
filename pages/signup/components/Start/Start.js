import * as validation from "@/services/formValidation";
import { mapActions, mapGetters, } from 'vuex';
import { usersCheckInviteCode } from '@/api/users/usersCheckInviteCode';
import RocketSvg from '@/assets/svg/rocket.svg';
import AppButton from '@/components/AppButton/AppButton.vue';

export default {
  components: {
    RocketSvg,
    AppButton,
  },

  props: {},
  data() {
    return {
      valid: true,
      loading: false,
      title: 'Стать партнёром',
      subTitle: 'EVALITE - это игры, сервисы, продукты и комьюнити людей для ускорения, облегчения и снижения затрат на саморазвитие.',
      code: '',
      codeRules: [
        validation.required(),
      ],
      btnStyles: {
        height: '48px',
      },
      continueBtnTitle: 'Продолжить',
      signinBtnTitle: 'Войти',
      signinBtnStyles: {
        color: '#263043',
      },
      actionsInfoTitle: 'Уже зарегистрировались? Нажимайте войти',
    };
  },
  computed: {
    ...mapGetters('userSignupStore', ['userSignupData']), //DELETE
  },

  watch: {
    code(newVal) {
      this.setUserSignupData({ user_promo_code: newVal });
    },
  },
  methods: {
    ...mapActions('userSignupStore', ['setUserSignupData']),
    async next() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        const response = await usersCheckInviteCode(this.code);

        this.loading = false;

        if (response.status === 200) {
          this.$emit('next');
        } else {
          alert('Промокод не найден');
        }
      }
    },
    signin() {
      this.$router.push({ name: 'signin' });
    },
  },

  created() { },
  mounted() { },
}
