import AppSkeleton from '@/components/AppSkeleton/AppSkeleton.vue';

export default {
  components: {
    AppSkeleton,
  },
  props: {},
  data() {
    return {
      stubHeightAvatar: 64,
      stubHeight: 20,
      infos: [
        {
          title: 'Дата рождения',
        },
        {
          title: 'Номер телефона',
        },
        {
          title: 'Email',
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() { },
  mounted() { },
};
