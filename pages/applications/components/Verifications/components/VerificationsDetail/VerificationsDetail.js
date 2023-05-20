import AppOverlay from '@/components/AppOverlay/AppOverlay.vue';
import AppCard from '@/components/AppCard/AppCard.vue';
import AppTextField from '@/components/AppTextField/AppTextField.vue';

export default {
  components: {
    AppOverlay,
    AppCard,
    AppTextField,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      test: '',
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
  },
  created() { },
  mounted() { },
}
