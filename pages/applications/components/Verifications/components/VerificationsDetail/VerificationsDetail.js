import AppOverlay from '@/components/AppOverlay/AppOverlay.vue';
import AppCard from '@/components/AppCard/AppCard.vue';
import AppTextField from '@/components/AppTextField/AppTextField.vue';
import AppSelect from '@/components/AppSelect/AppSelect.vue';
import * as validation from "@/services/formValidation";

export default {
  components: {
    AppOverlay,
    AppCard,
    AppTextField,
    AppSelect,
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
      this.$emit('save');
    },

    validForm() {
      console.debug(this.$refs.form.validate()); //DELETE
    },
  },
  created() { },
  mounted() { },
}
