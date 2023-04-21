import { mapGetters } from 'vuex';
import { usersEmailConfirm } from '@/api/users/usersEmailConfirm';
import { usersEmailConfirmCode } from '@/api/users/usersEmailConfirmCode';
import AppStepperProgress from '@/components/AppStepperProgress';
import Pdf from '@/assets/svg/pdf.svg';
import Step1PersonalData from '../Step1PersonalData/Step1PersonalData.vue';
import Step1Confirm from '../Step1Confirm/Step1Confirm.vue';
import Step2Pass from '../Step2Pass/Step2Pass.vue';
import Step3Agreement from '../Step3Agreement/Step3Agreement.vue';
import Step4Docs from '../Step4Docs/Step4Docs.vue';
import Step5PaymentInfo from '../Step5PaymentInfo/Step5PaymentInfo.vue';
import steps from './shared/steps';

export default {
  components: {
    AppStepperProgress,
    Step1PersonalData,
    Step1Confirm,
    Step2Pass,
    Step3Agreement,
    Step4Docs,
    Step5PaymentInfo,
    Pdf,
  },

  props: {},
  data() {
    return {
      length: 6,
      loading: false,
      onboarding: 5,
      formsCount: 5,
      confirmTimerCount: 30,
      confirmTimer: null,
      step1PersonalDataProgress: 0,
      step1ConfirmProgress: 0,
      step2PassProgress: 0,
      step3AgreementProgress: 0,
      step4DocsProgress: 0,
      step5PaymentInfoProgress: 0,

      //text-data
      actionsStep3Title: 'Согласие на использование электронного документооборота',
      actionsStep3Text: 'Нажимая кнопку "Принимаю условия", Вы соглашаетесь с условиями использования Ваших данных в обмене документами с системой Evalite.',
      actionsStep3AgreementTitle: 'Cоглашение на обмен персональными данными и документами посредством ЭЦП',
    };
  },
  computed: {
    ...mapGetters('userSignupStore', ['userSignupData']),
    confirmSendCodeTitle() {
      return this.confirmTimerCount
        ? `Отправить повторно через ${this.confirmTimerCount} сек`
        : 'Отправить повторно';
    },
    isConfirmSendCodeActive() {
      return !this.confirmTimerCount;
    },
    nextBtnTitle() {
      if (this.onboarding === 3) {
        return 'принимаю условия';
      }

      return 'Далее'
    },
    steps() {
      return steps.map((step, index) => ({
        ...step,
        progress: this.getStepProgress(index),
        active: this.getStepActiveStatus(index),
      }));
    },
  },

  watch: {
    confirmTimerCount(newVal) {
      if (!newVal) {
        clearInterval(this.confirmTimer);
      }
    },
  },
  methods: {
    /* GETTERS */
    getStepProgress(index = null) {
      switch (index) {
        case 0:
          return this.step1PersonalDataProgress + this.step1ConfirmProgress;

        case 1:
          return this.step2PassProgress;

        case 2:
          return this.step3AgreementProgress;

        case 3:
          return this.step4DocsProgress;

        case 4:
          return this.step5PaymentInfoProgress;

        default:
          return 0;
      }
    },
    getStepActiveStatus(index = null) {
      if (index === 0 && (this.onboarding === 0 || this.onboarding === 1)) {
        return true;
      }

      if (index === 1 && this.onboarding === 2) {
        return true;
      }

      if (index === 2 && this.onboarding === 3) {
        return true;
      }

      if (index === 3 && this.onboarding === 4) {
        return true;
      }

      if (index === 4 && this.onboarding === 5) {
        return true;
      }

      return false;
    },

    /* SETTERS */
    /* HANDLERS */
    async next() {
      console.debug('Steps/next/onboarding', this.onboarding); //DELETE

      this.loading = true;

      if (this.onboarding === 0) {
        // TODO exec valudation
        await this.sendConfirmCodeToEmail();
      }

      if (this.onboarding === 1) {
        // TODO exec valudation
        const response = await this.sendConfirmCode();

        if (response.status !== 200) {
          alert('Неверный код');
          this.loading = false;
          return;
        }
      }

      if (this.onboarding === 3) {
        this.step3AgreementProgress = 100;
      }

      if (this.onboarding + 1 === this.length) {
        this.onboarding = 0;

        this.$emit('next');
      } else {
        this.onboarding++;
      }

      this.loading = false;
    },
    prev() {
      this.onboarding = this.onboarding - 1 < 0
        ? this.length - 1
        : this.onboarding - 1;
    },
    startConfirmTimer() {
      clearInterval(this.confirmTimer);

      this.confirmTimer = setInterval(() => {
        this.confirmTimerCount--;
      }, 1000);
    },

    /* HELPERS */
    /* ACTIONS */
    async sendConfirmCode() {
      console.debug('sendConfirmCode/this.userSignupData.user_email', this.userSignupData.user_email); //DELETE
      console.debug('sendConfirmCode/this.userSignupData.user_confirm_code', this.userSignupData.user_confirm_code); //DELETE

      const response = await usersEmailConfirm(this.userSignupData.user_email, this.userSignupData.user_confirm_code);

      console.debug('sendConfirmCode/response', response); //DELETE

      return response;
    },
    async sendConfirmCodeToEmail() {
      console.debug('sendConfirmCodeToEmail/this.userSignupData.email', this.userSignupData.user_email); //DELETE

      const response = await usersEmailConfirmCode(this.userSignupData.user_email);

      console.debug('sendConfirmCodeToEmail/response', response); //DELETE
    },
  },

  created() { },
  mounted() { },
}
