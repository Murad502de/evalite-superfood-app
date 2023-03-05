<template>
  <div class="ftype-select">
    <v-select
      v-model="select"
      :id="id"
      :items="options"
      :rules="[v => !!v || 'Выберите вариант']"
      required
      single-line
      outlined
      filled
      @input="$emit('input', select)"
      hide-details="true"
      :readonly="readonly"
    ></v-select>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'params', 'value'],
  computed: {
    options() {
      return this.params.options
    },
  },
  data() {
    return {
      select: null,
      readonly: false,
    }
  },
  methods: {
    setReadonly() {
      if (this.params && this.params.readonly) {
        this.readonly = this.params.readonly;
      } else {
        this.readonly = false;
      }
    },
  },
  watch: {
    value: function () {
      this.select = this.value;
    },
    params: {
      handler(){
        this.setReadonly();
      },
      deep: true
    },
  },
  created() {
    if (this.value) {
      this.select = this.value;
    } else {
      this.select = this.params.options[0];
    }

    this.setReadonly();

    this.$emit('input', this.select);
  }
}
</script>

<style lang="scss">
.ruqi {

  .ftype-select {
    .v-input {
      &.v-input--is-readonly {
        .v-input__control{
          background: #f5f5f5;
        }
      }
    }
  }
}

</style>
