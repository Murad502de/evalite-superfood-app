<template lang="pug">
  v-row
    v-breadcrumbs(:items="crumbs" v-if="crumbs.length > 1")
      template(v-slot:divider)
        v-icon mdi-checkbox-blank-circle

</template>

<script>

export default {
  data() {
    return {
    }
  },
  computed: {
    crumbs() {
      return this.$store.getters['breadcrumbs/breadcrumbs']
    },
  },
}
</script>
