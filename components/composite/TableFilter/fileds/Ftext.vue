<template lang="pug">
  .ruqi-table-filter-text
    v-textarea(
      :name="params.field"
      single-line
      outlined
      filled
      v-model="value"
      @input="$emit('input', value)"
      hide-details="auto"
    )

</template>

<script>


export default {
  props: {
    params: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      value: '',

    }
  },
  computed: {

  },
  methods: {

  },
  created() {


  },
  watch: {


  },
}
</script>

<style lang="scss">

.ruqi-table-filter-text{
  .v-text-field--outlined > .v-input__control > .v-input__slot,
  .theme--light.v-text-field--filled > .v-input__control > .v-input__slot{
    background: #fff;
  }


}


</style>
