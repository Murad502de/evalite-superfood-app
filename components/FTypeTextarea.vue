<template>
  <div>
    <v-textarea
      :id="id"
      single-line
      outlined
      filled
      v-model="new_value"
      @input="$emit('input', new_value)"
      hide-details="true"
    ></v-textarea>

  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'params', 'value'],
  data() {
    return {
      new_value: '',
    }
  },
  watch: {
    value: function () {
      this.new_value = this.value;
    },
  }
}
</script>

<style>

</style>
