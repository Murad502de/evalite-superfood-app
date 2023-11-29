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
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    issueDate: {
      type: String,
      required: true,
    },
    validity: {
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
    birthPlace: {
      type: String,
      required: true,
    },
    birthDate: {
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
          title: 'Срок действия',
          value: this.validity,
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
          title: 'Место рождения',
          value: this.birthPlace,
        },
        {
          title: 'Дата рождения',
          value: this.birthDate,
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
