import AppBarEmpty from '@/components/AppBarEmpty';
import AppStepperProgress from '@/components/AppStepperProgress';
import Step1PersonalData from './components/Step1PersonalData';
import Step1Confirm from './components/Step1Confirm';
import Step2Pass from './components/Step2Pass';
import Step3Agreement from './components/Step3Agreement';
import Step4Docs from './components/Step4Docs';

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
  },

  props: {},
  data() {
    return {
      onboarding: 0,
      formsCount: 5,
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
    };
  },
  computed: {},

  watch: {},
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
