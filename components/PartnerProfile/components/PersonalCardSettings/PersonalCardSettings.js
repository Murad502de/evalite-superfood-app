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
    validateDataForm() {
      const formRef = this.$refs.partner_profile_personal_data_form;

      if (formRef) {
        if (!formRef.validate()) {
          this.tab = 0;
          return false;
        }
      }

      return true;
    },
    validatePasswordForm() {
      const formRef = this.$refs.partner_profile_personal_password_form;

      if (formRef) {
        if (!formRef.validate()) {
          this.tab = 1;
          return false;
        }
      }

      return true;
    },
    validate() {
      return this.validateDataForm() && this.validatePasswordForm();
    },
  },
  created() { },
  mounted() { },
};
