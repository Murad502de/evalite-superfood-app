<template>
  <div class="d-flex w-100">
    <v-checkbox
      v-for="(item, index) in params.options" :key="index"
      :name="params.options[index].name"
      :v-model="item.value"
      :label="item.label"
      color="primary"
      hide-details
      @change="$emit('input', item.value)"
    ></v-checkbox>
  </div>
</template>

<script>
export default {
  props: ['name', 'params', 'value', 'label'],
  data() {
    return {
      checkbox: '',
    }
  },
}
</script>

<style lang="scss" scoped>
.v-input--checkbox{
  width: auto;
  margin: 0 16px 0 0;
  padding: 14px;
  background: #fff;
  border: 1px solid #E2E4E5;
  border-radius: 4px;

  &:last-child{
    margin-right: 0;
  }
}

</style>
