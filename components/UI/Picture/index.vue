<template lang="pug">
.ui-picture
  component.ui-picture__svg(
    v-if="svg"
    :is="getComponent(name)"
  )
  img.ui-picture__img(
    v-else-if="name"
    :src="require(`../../../assets/img/${name}`)"
  )
</template>

<script>
import MedicalBook from '@/components/Pictures/MedicalBook';

export default {
  components: {
    MedicalBook,
  },

  props: {
    svg: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
  },
  data: () => ({}),
  computed: {},

  watch: {},
  methods: {
    /* GETTERS */
    getComponent(name) {
      switch (name) {
        case 'medical_book.svg':
          return 'MedicalBook';

        default:
          return '';
      }
    },

    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
  },

  created() { },
  mounted() { },
}
</script>

<style lang="scss">
</style>
