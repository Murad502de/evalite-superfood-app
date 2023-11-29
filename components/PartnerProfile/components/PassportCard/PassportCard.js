import AppCard from '@/components/AppCard/AppCard.vue';

export default {
  components: {
    AppCard,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    series: {
      type: String | Number,
      required: true,
    },
    number: {
      type: String | Number,
      required: true,
    },
    issueDate: {
      type: String,
      required: true,
    },
    issuedBy: {
      type: String,
      required: true,
    },
    departmentCode: {
      type: String,
      required: true,
    },
    registrationAddress: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    fields() {
      return [
        {
          title: 'ФИО в паспорте',
          value: this.name,
        },
        {
          title: 'Серия ',
          value: this.series,
        },
        {
          title: 'Номер',
          value: this.number,
        },
        {
          title: 'Дата выдачи',
          value: this.issueDate,
        },
        {
          title: 'Кем выдан',
          value: this.issuedBy,
        },
        {
          title: 'Код подразделения',
          value: this.departmentCode,
        },
        {
          title: 'Адрес регистрации',
          value: this.registrationAddress,
        },
      ];
    },
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
