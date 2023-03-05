<template>
  <div>
    <v-radio-group
      v-model="row"
      :row="params.row"
      @change="$emit('input', row)"
      hide-details
      :name="name"
    >
      <v-radio v-if="params"
               v-for="(item, index) in params.options" :key="index"
               :label="item.label"
               :value="item.value"
               hide-details
      ></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  props: ['name', 'params', 'value', 'label'],
  data() {
    return {
      row: null,
    }
  },
  methods: {},
  created() {
    if (this.value) {
      this.row = this.value;
    }
  },
  watch: {
    value: function () {
      this.row = this.value;
    },
  },
}
</script>

<style lang="scss" scoped>


</style>
