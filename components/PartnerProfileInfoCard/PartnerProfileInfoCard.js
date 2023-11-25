import AppAvatar from '@/components/AppAvatar/AppAvatar.vue';

export default {
  components: {
    AppAvatar
  },
  props: {
    avatar: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    inviteCode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    infos() {
      return [
        {
          title: 'Дата рождения',
          value: this.birthday,
        },
        {
          title: 'Номер телефона',
          value: this.tel,
        },
        {
          title: 'Email',
          value: this.email,
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
