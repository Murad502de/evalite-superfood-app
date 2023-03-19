import AppBarEmpty from '@/components/AppBarEmpty';
import AppStepperProgress from '@/components/AppStepperProgress';

export default {
  layout: "empty",
  components: {
    AppBarEmpty,
    AppStepperProgress,
  },

  props: {},
  data() {
    return {
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
