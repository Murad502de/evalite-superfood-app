<template>
  <div :class="params.class">
    <v-checkbox
      v-model="checkbox"
      :label="params.label"
      color="primary"
      hide-details
      @change="$emit('input', checkbox)"
    ></v-checkbox>
    <div class="note" v-if="params && params.note">{{ params.note }}</div>
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
  methods: {},
  created() {
    if (this.value) {
      this.checkbox = this.value;
    }
  },
  watch: {
    value: function () {
      this.checkbox = this.value;
    },
  },
}
</script>

<style lang="scss" scoped>

@import '/assets/scss/colors.scss';

.v-input--selection-controls {
  margin-top: 0;
}

.note {
  font-size: 14px;
  margin-top: 12px;
  color: $grey;
}

.style2{
  .v-input--checkbox{
    width: auto;
    margin: 0 4px 0 0;
    padding: 12px;
    background: #fff;
    border: 1px solid #E2E4E5;
    border-radius: 4px;

  }
}

</style>
