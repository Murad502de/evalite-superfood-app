import AppOverlay from '@/components/AppOverlay/AppOverlay.vue';
import AppCard from '@/components/AppCard/AppCard.vue';
import AppButton from '@/components/AppButton/AppButton.vue';
import AppTextField from '@/components/AppTextField/AppTextField.vue';
import AppSelect from '@/components/AppSelect/AppSelect.vue';
import AppFormPersonalData from '@/components/AppFormPersonalData/AppFormPersonalData.vue';
import AppFormPassport from '@/components/AppFormPassport/AppFormPassport.vue';
import AppFormPaymentDetailsSE from '@/components/AppFormPaymentDetailsSE/AppFormPaymentDetailsSE.vue';
import AppFormPaymentDetailsIE from '@/components/AppFormPaymentDetailsIE/AppFormPaymentDetailsIE.vue';

export default {
  components: {
    AppOverlay,
    AppCard,
    AppButton,
    AppTextField,
    AppSelect,
    AppFormPersonalData,
    AppFormPassport,
    AppFormPaymentDetailsSE,
    AppFormPaymentDetailsIE,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Object | null,
      required: true,
    },
  },
  data() {
    return {
      tab: 0,
      valid: true,
      approveLoading: false,
    };
  },
  computed: {
    title() {
      if (this.user === null) return;
      return this.user.fullName;
    },
  },
  watch: {},
  methods: {
    close() {
      if (this.approveLoading) return;
      this.$emit('close');
    },
    save() {
      if (this.validForms()) {
        // this.$emit('save');
      }
    },
    approve() {
      if (this.validForms()) {
        // this.approveLoading = true;

        // setTimeout(() => { //FIXME
        //   this.approveLoading = false;
        //   this.$emit('approve');
        // }, 5000);
      }
    },
    validForms() {
      const personalDataForm = this.$refs.personal_data_form;
      const passportForm = this.$refs.passport_form;

      console.debug('personalDataForm', personalDataForm); //DELETE
      console.debug('passport_form', passportForm); //DELETE

      if (!personalDataForm || !passportForm) {
        alert('Необходимо проверить всё разделы');
        return false;
      }

      if (!personalDataForm.validate()) {
        this.tab = 0;
        return false;
      }

      if (!passportForm.validate()) {
        this.tab = 1;
        return false;
      }

      return true;
    },
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
  },
  created() { },
  mounted() { },
}
