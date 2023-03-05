<template lang="pug">
  .ruqi-table-filter-check
    v-checkbox(
      :label="label"
      color="primary"
      v-model="new_value"
      hide-details
      @change="$emit('input', new_value)")

</template>

<script>


export default {
  props: {
    params: {
      type: Object,
      default: {},
    },
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: '',
      new_value: '',
    }
  },
  mounted() {
    //this.new_value = this.params.value;
  },
  watch: {
    params: {
      handler(val){
       this.new_value = this.params.value;
      },
      deep: true
    }
  },
}
</script>

<style lang="scss">

.ruqi-table-filter-list{


}

</style>
