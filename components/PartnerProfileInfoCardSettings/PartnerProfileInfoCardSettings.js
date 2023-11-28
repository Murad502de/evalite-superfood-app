import AppCard from '@/components/AppCard/AppCard.vue';
import AppFormPersonalData from '@/components/AppFormPersonalData/AppFormPersonalData.vue';
import AppFormPassword from '@/components/AppFormPassword/AppFormPassword.vue';

export default {
  components: {
    AppCard,
    AppFormPersonalData,
    AppFormPassword
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    saveLoading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tab: 0,
      valid: true,
    };
  },
  computed: {},
  watch: {},
  methods: {
    updateAvatar(value) {
      this.$emit('update:avatar', value);
    },
    updateSecondName(value) {
      this.$emit('update:second_name', value);
    },
    updateFirstName(value) {
      this.$emit('update:first_name', value);
    },
    updateThirdName(value) {
      this.$emit('update:third_name', value);
    },
    updateGender(value) {
      this.$emit('update:gender', value);
    },
    updateBirthday(value) {
      this.$emit('update:birthday', value);
    },
    updateEmail(value) {
      this.$emit('update:email', value);
    },
    updatePhone(value) {
      this.$emit('update:phone', value);
    },
    updatePassword(value) {
      this.$emit('update:password', value);
    },
  },
  created() { },
  mounted() { },
};
