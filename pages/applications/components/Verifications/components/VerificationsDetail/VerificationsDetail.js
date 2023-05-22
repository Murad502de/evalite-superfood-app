import * as validation from "@/services/formValidation";
import AppOverlay from '@/components/AppOverlay/AppOverlay.vue';
import AppCard from '@/components/AppCard/AppCard.vue';
import AppButton from '@/components/AppButton/AppButton.vue';
import AppTextField from '@/components/AppTextField/AppTextField.vue';
import AppSelect from '@/components/AppSelect/AppSelect.vue';
import AppFormPersonalData from '@/components/AppFormPersonalData/AppFormPersonalData.vue';

export default {
  components: {
    AppOverlay,
    AppCard,
    AppButton,
    AppTextField,
    AppSelect,
    AppFormPersonalData,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tab: 0,
      valid: true,
      test: '', //DELETE
      test2: '', //DELETE
      rules: [
        validation.required(),
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    close() {
      this.$emit('close');
    },
    save() {
      if (this.validForms()) {
        this.$emit('save');
      }
    },
    approve() {
      if (this.validForms()) {
        this.$emit('approve');
      }
    },
    validForms() {
      console.debug(this.$refs.personal_data_form.$refs.form.validate()); //DELETE

      return this.$refs.personal_data_form.$refs.form.validate();
    },
  },
  created() { },
  mounted() { },
}
