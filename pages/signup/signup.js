import AppBarEmpty from '@/components/AppBarEmpty';
import AppStepperProgress from '@/components/AppStepperProgress';
import Step1PersonalData from './components/Step1PersonalData';
import Step1Confirm from './components/Step1Confirm';
import Step2Pass from './components/Step2Pass';
import Step3Agreement from './components/Step3Agreement';
import Step4Docs from './components/Step4Docs';
import Pdf from '@/assets/svg/pdf.svg';

export default {
  layout: "empty",
  components: {
    AppBarEmpty,
    AppStepperProgress,
    Step1PersonalData,
    Step1Confirm,
    Step2Pass,
    Step3Agreement,
    Step4Docs,
    Pdf,
  },

  props: {},
  data() {
    return {
      onboarding: 2,
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
      this.onboarding = this.onboarding + 1 === this.length
        ? 0
        : this.onboarding + 1;
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

  created() {
    console.debug("pages/signup/created"); //DELETE
  },
  mounted() {
    console.debug("pages/signup/mounted"); //DELETE
  },
}
