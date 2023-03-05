<template lang="pug">
  .form-info(v-if="new_value")
    .form-part-label {{ params.label }}
    .form-info-text {{ new_value }}

</template>

<script>
export default {
  props: ['name', 'params', 'value'],
  data() {
    return {
      new_value: '',
    }
  },
  watch: {
    value: function () {
      this.new_value = this.value;
    },
  },
  created() {
    this.new_value = this.value;
  }
}
</script>

<style>

</style>
