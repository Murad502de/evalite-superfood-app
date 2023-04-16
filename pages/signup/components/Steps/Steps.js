import AppStepperProgress from '@/components/AppStepperProgress';
import Step1PersonalData from '../Step1PersonalData';
import Step1Confirm from '../Step1Confirm';
import Step2Pass from '../Step2Pass';
import Step3Agreement from '../Step3Agreement';
import Step4Docs from '../Step4Docs/Step4Docs.vue';
import Step5PaymentInfo from '../Step5PaymentInfo/Step5PaymentInfo.vue';
import Pdf from '@/assets/svg/pdf.svg';

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
      onboarding: 5,
      formsCount: 5,
      confirmTimerCount: 30,
      confirmTimer: null,
      steps: [
        {
          title: 'Шаг 1',
          name: 'Личные данные',
          progress: 10,
        },
        {
          title: 'Шаг 2',
          name: 'Создание пароля',
          progress: 15,
        },
        {
          title: 'Шаг 3',
          name: 'Соглашение ЭДО',
          progress: 20,
        },
        {
          title: 'Шаг 1',
          name: 'Личные данные',
          progress: 10,
        },
        {
          title: 'Шаг 2',
          name: 'Создание пароля',
          progress: 15,
        },
        {
          title: 'Шаг 3',
          name: 'Соглашение ЭДО',
          progress: 20,
        },
        {
          title: 'Шаг 1',
          name: 'Личные данные',
          progress: 10,
        },
        {
          title: 'Шаг 2',
          name: 'Создание пароля',
          progress: 15,
        },
        {
          title: 'Шаг 3',
          name: 'Соглашение ЭДО',
          progress: 20,
        },
        {
          title: 'Шаг 1',
          name: 'Личные данные',
          progress: 10,
        },
        {
          title: 'Шаг 2',
          name: 'Создание пароля',
          progress: 15,
        },
        {
          title: 'Шаг 3',
          name: 'Соглашение ЭДО',
          progress: 20,
        },
        {
          title: 'Шаг 11',
          name: 'Личные данные',
          progress: 45,
          active: true,
        },
        {
          title: 'Шаг 2',
          name: 'Создание пароля',
          progress: 15,
        },
        {
          title: 'Шаг 3',
          name: 'Соглашение ЭДО',
          progress: 20,
        },
        {
          title: 'Шаг 1',
          name: 'Личные данные',
          progress: 10,
        },
        {
          title: 'Шаг 2',
          name: 'Создание пароля',
          progress: 15,
        },
        {
          title: 'Шаг 3',
          name: 'Соглашение ЭДО',
          progress: 20,
        },
      ],

      //text-data
      actionsStep3Title: 'Согласие на использование электронного документооборота',
      actionsStep3Text: 'Нажимая кнопку "Принимаю условия", Вы соглашаетесь с условиями использования Ваших данных в обмене документами с системой Evalite.',
      actionsStep3AgreementTitle: 'Cоглашение на обмен персональными данными и документами посредством ЭЦП',
    };
  },
  computed: {
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
    /* SETTERS */
    /* HANDLERS */
    next() {
      if (this.onboarding + 1 === this.length) {
        this.onboarding = 0;

        this.$emit('next');
      } else {
        this.onboarding++;
      }
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
  },

  created() { },
  mounted() { },
}
