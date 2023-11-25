import AppAvatar from '@/components/AppAvatar/AppAvatar.vue';

export default {
  components: {
    AppAvatar
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    infos() {
      return [
        {
          title: 'Дата рождения',
          value: '26.06.1984', //FIXME
        },
        {
          title: 'Номер телефона',
          value: '+79615554411', //FIXME
        },
        {
          title: 'Email',
          value: 'ivanov84@mail.ru', //FIXME
        },
      ];
    }
  },
  watch: {},
  methods: {
    edit() {
      this.$emit('edit');
    },
  },
  created() { },
  mounted() { },
};
